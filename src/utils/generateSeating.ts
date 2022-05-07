import { generateArray } from "./generateArray";

// Initial seating according to a greedy heuristic
const initialSeating = (nTables: number, nRounds: number): number[][][] => {
    const rounds = generateArray(nRounds);
    const tables = generateArray(nTables);
    const seatsInTable = 4;
    const seats = generateArray(seatsInTable);
    var currentTable = 0;
    var offset = 0;

    return rounds.map((round: number): number[][] =>
        tables.map((table: number): number[] =>
        seats.map((seat: number): number =>
            {
                if(round === 0)
                {
                    // First round is just everyone in order
                    return (table * seatsInTable + seat);
                }
                else
                {
                    // Pick the i-th person in each group modulo group size, where i is offset by group index and round
                    // For round 1, just pick the first player in each group
                    // Offset picks the next people (using same logic) after each group has been picked from,
                    // so that all people from all groups are eventually picked
                    const player = currentTable * seatsInTable + (offset + currentTable * (round - 1)) % seatsInTable;
                    currentTable = currentTable + 1; // Next table
                    if(currentTable >= nTables) // Went past last table
                    {
                        offset = offset + 1; // Take the next person from each table
                        currentTable = 0; // Back to first table
                    }
                    return player;
                }
            })));
}

function uniquePairs<T>(list: T[]): T[][] {
    var pairs: T[][] = [];

    var i, j;

    for(i = 0; i < list.length; i++)
    {
        for(j = i + 1; j < list.length; j++)
        {
            pairs[pairs.length] = [list[i], list[j]];
        }
    }

    return pairs;
}

type Seat = {round: number, table: number, seat: number};
type Meeting = {player1: Seat, player2: Seat};
type Meetings = {[key: string]: Meeting[]};

// Hard-typed constructor
function seat(round: number, table: number, seat: number): Seat {
    return {round: round, table: table, seat: seat}
}

// Shorthand to reduce redundant info
function meeting(round: number, table: number, seat1: number, seat2: number): Meeting {
    return {player1: seat(round, table, seat1), player2: seat(round, table, seat2)};
}

const bySeat = (seat: Seat, seating: number[][][]): number =>
    seating[seat.round][seat.table][seat.seat]

// Make a unique key for a pair of players
const makeKey = (player1: number, player2: number) => [player1, player2].sort().toString();

// Gather all the meeting pairs of players in this schedule
const allMeetings = (schedule: number[][][]) => {
    var totalMeetings: Meetings = {};

    schedule.forEach((round: number[][], roundIndex: number) =>
        round.forEach((table: number[], tableIndex: number) => {
            // Get the player pairs meeting in this table and ensure they are in consistent order
            uniquePairs(generateArray(table.length)).map((pair: number[]) => pair.sort())
                // Then add the meetings to the total count
                .forEach((pair: number[]) => {
                    const key = makeKey(table[pair[0]], table[pair[1]]);
                    if(key in totalMeetings)
                    {
                        totalMeetings[key].push(meeting(roundIndex, tableIndex, pair[0], pair[1]));
                    }
                    else
                    {
                        totalMeetings[key] = [meeting(roundIndex, tableIndex, pair[0], pair[1])];
                    }
                });
        }));
    
    return totalMeetings;
}

// Count the number of violations in a meetings table (e.g. same players meeting for more than one time)
const violations = (meetings: Meetings): number =>
    Object.keys(meetings)
        .map((meeting: string) => meetings[meeting].length)
        // Meeting just once is not a violation
        .reduce((total: number, current: number) => total + current - 1, 0);

// Simple, small shuffle
function shuffle<T>(unshuffled: T[]) {
    return unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Random integer (max not incluive)
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// Pick one element randomly
function pick<T>(choices: T[]) {
    return choices[getRandomInt(choices.length)];
}

// Mysteriously missing function of arrays
// Put array elements to bins by some key mapping
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

// All swaps that can be done
const potentialSwaps = (
    iteration: number,
    tabus: {[meeting: string]: number}[],
    meetings: Meetings, // Conflicting meetings only
    seating: number[][][]
): Record<number, Meeting[]> => {
    const conflictList = Object.keys(meetings).map(x => meetings[x]).filter(x => x.length > 1).flat();

    const swaps = conflictList.map((meeting: Meeting): Meeting[] => {
        // Get round and table
        const round = meeting.player1.round;
        const table = meeting.player1.table;
        const seat1 = meeting.player1.seat;
        const seat2 = meeting.player2.seat;

        // Find all other tables and generate swaps
        return seating[round].map((tableSeating: number[], tableIndex: number) => {
            if(tableIndex === table)
            {
                // No point swapping within the table
                return [];
            }

            return tableSeating.map((_: number, seatIndex: number): Meeting => {
                return {player1: seat(round, table, seat1), player2: seat(round, tableIndex, seatIndex)};
            }).concat(
                tableSeating.map((_: number, seatIndex: number): Meeting => {
                    return {player1: seat(round, table, seat2), player2: seat(round, tableIndex, seatIndex)};
                }));
        }).flat()
        .filter( swap => {
            // Verify that the swap is not tabu
            const player1 = bySeat(swap.player1, seating);
            const player2 = bySeat(swap.player2, seating);
            const key = makeKey(player1, player2);
            const isTabu = (key in tabus[round]) && (tabus[round][key] >= iteration);

            return !isTabu;
        });
    }).flat();

    return groupBy(swaps, swap => {
        // Verify that the swap is not tabu
        const round = swap.player1.round;
        const player1 = bySeat(swap.player1, seating);
        const player2 = bySeat(swap.player2, seating);
        const key = makeKey(player1, player2);

        // Verify that the swap does not increase the number of violations
        const removedKeys = uniquePairs(seating[round][swap.player1.table])
            .filter(pair => pair.includes(player1))
            .map(pair => makeKey(pair[0], pair[1]))
            .concat(uniquePairs(seating[round][swap.player2.table])
            .filter(pair => pair.includes(player2))
            .map(pair => makeKey(pair[0], pair[1])));

        const addedKeys = uniquePairs(seating[round][swap.player1.table]
            .filter(plr => plr !== player1).concat([player2]))
            .filter(pair => pair.includes(player2)).map(pair => makeKey(pair[0], pair[1]))
            .concat(uniquePairs(seating[round][swap.player2.table]
                .filter(plr => plr !== player2).concat([player1]))
                .filter(pair => pair.includes(player1)).map(pair => makeKey(pair[0], pair[1])));

        const removes = removedKeys.map<number>(key => meetings[key].length > 1 ? 1 : 0).reduce((sum, cur) => sum + cur, 0);
        const additions = addedKeys.map<number>(key => key in meetings ? 1 : 0).reduce((sum, cur) => sum + cur, 0);

        // +1 Makes the best tier contain only swaps that improve the solution instead of lumping them together with neutral swaps
        return Math.max(additions - removes + 1, 0);
    });
}

// Perform a swap
const performSwap = (swap: Meeting, seating: number[][][]): void => {
    const player1 = bySeat(swap.player1, seating);
    seating[swap.player1.round][swap.player1.table][swap.player1.seat] = bySeat(swap.player2, seating);
    seating[swap.player2.round][swap.player2.table][swap.player2.seat] = player1;
};

// Helper for tabuSeating
// Picks a week and player pair to swap and swaps them in the seating, producing a new seating
const pickASwap = (
    iteration: number,
    tabuUntil: number, // The chosen swap is tabu until this iteration
    seating: number[][][], // Current seating
    tabu: {[meeting: string]: number}[], // Swaps that are not allowed, per week
    meetings: Meetings // Current stats about player pairs meeting in tables
): number[][][] => {
    var copyOfSeating = seating; // Don't copy yet

    const swaps = potentialSwaps(iteration, tabu, meetings, seating);
    for(var i = 0; i <= 10; i++)
    {
        if(i in swaps && swaps[i].length > 0)
        {
            copyOfSeating = seating.map(x => x.map(y => y.map(z => z)));
            const theSwap = pick(swaps[i]);
            const player1 = bySeat(theSwap.player1, seating)
            const player2 = bySeat(theSwap.player2, seating)
            tabu[theSwap.player1.round][makeKey(player1, player2)] = iteration + tabuUntil;
            performSwap(theSwap, copyOfSeating);
            return copyOfSeating;
        }
    }
    console.log('no swaps');
    
    return copyOfSeating;
}

// Optimize an initial seating using tabu search
// For every week, try to swap players between tables in a way to reduce the number of repeat meetings between players
// The tabu table contains swaps that are temporarily considered "tabu" to avoid going back to a previous state too easily
const tabuSeating = (
    minTabu: number, // Minimum time that a swap is considered tabu
    maxTabu: number, // Maximum time that a swap is considered tabu
    maxIterations: number, // Maximum number of iterations to try to optimize
    maxStable: number, // Maximum number of iterations to try to improve a solution that has not improved before restarting
    nTables: number, // Number of tables per round
    nRounds: number  // Total number of rounds
): number[][][] => {
    // Generate a starting point using a heuristic
    var currentSeating = initialSeating(nTables, nRounds);
    var bestSeating = currentSeating;
    // Initialize tabu table:
    // For every week, the tabu table contains restrictions for which players are allowed to be swapped
    var tabu: {[meeting: string]: number}[] = generateArray(nRounds).map(_ => {return {}});
    var currentMeetings = allMeetings(currentSeating);
    var leastViolations = violations(currentMeetings);

    // Optimize using tabu search until reached max iterations or no more conflicts exist
    var i: number,s: number; // Iteration; stable iteration
    for(i = 0, s = 0; i < maxIterations && leastViolations > 0; i++)
    {
        currentSeating = pickASwap(i, getRandomInt(maxTabu + 1) + minTabu, currentSeating, tabu, currentMeetings);
        // Calculate and store stats
        currentMeetings = allMeetings(currentSeating);
        const currentViolations = violations(currentMeetings);

        if(currentViolations < leastViolations)
        {   // Solution has improved -> use the new solution
            console.log('solution improved: ' + leastViolations + ' vs ' + currentViolations);
            bestSeating = currentSeating;
            leastViolations = currentViolations;
            s = 0; // Reset stability counter
        }
        else if(s > maxStable)
        {   // Too many iterations without improvement
            // Do something a little different from the paper to avoid a state machine
            console.log('resetting');
            const reSeating = tabuSeating(minTabu, maxTabu, maxIterations - i, maxStable, nTables, nRounds);
            if(leastViolations < violations(allMeetings(reSeating)))
            {   // Everything was better back in the day
                return bestSeating;
            }
            // If the restarted seating is better; use it
            return reSeating;
        }
        else
        {   // No improvement, but still going to try
            console.log('no improvement: ' + leastViolations + ' vs ' + currentViolations);
            s++;
        }
    }

    // Iterated till maximum or found a solution, return solution
    return bestSeating;
}

const generateSeating = (nTables: number, nRounds: number): number[][][] => tabuSeating(4, 10, 2000, 400, nTables, nRounds);

export {
    generateSeating,
    allMeetings, // For console logging
    violations
}