import React from "react";
import { Game } from "../../../../../data-types/tournament-data-types";

type WindRowProps = {
  windId: number,
  games: Game[],
  playerNames: string[]
};

const WindRow = (props: WindRowProps) => {
  return (
    <>
      {
        props.games.map((game: Game, tableId: number) => (
          <React.Fragment key={`t-${tableId}-w-${props.windId}`}>
            <td>{["East", "South", "West", "North"][props.windId]}</td>
            <td>{props.playerNames[game.participants[props.windId].playerId]}</td>
          </React.Fragment>
        ))
      }
    </>
  )
};

export default WindRow;