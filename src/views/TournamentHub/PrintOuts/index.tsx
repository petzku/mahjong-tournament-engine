import PrintableIframe from "../../../components/PrintableIframe";
import { Routes } from "../../../utils/routeUtils";

const PlayerSchedules = () => {
	return (
		<div>
			<h1>Print-outs</h1>
			<p>Print-outs can be printed on paper or exported to PDF (requires a print-to-PDF thingy).</p>
			<h2>Full schedule (NYI)</h2>
			<PrintableIframe
				label={"Print full schedule"}
				subLabel={"(not yet implemented)"}
				id={"full-schedule"}
				src={Routes.FullSchedule}
			/>
			<h2>Personal schedules</h2>
			<PrintableIframe
				label={"Print personal schedules"}
				id={"personal-schedules"}
				src={Routes.PrintPersonalSchedules}
			/>
			<h2>Table score forms (NYI)</h2>
			<p>Hint: if your printer supports printing on both sides, select that option. Otherwise print odd-numbered pages first, then flip the sheets, and print even-numbered pages.</p>
			<PrintableIframe
				label={"Print score forms"}
				subLabel={"(not yet implemented)"}
				id={"score-forms"}
				src={Routes.PrintScoreForms}
			/>
		</div>
	);
};

export default PlayerSchedules;