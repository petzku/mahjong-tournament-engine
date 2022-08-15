import { Tournament } from "../data-types/tournament-data-types";

const download = (state: Tournament) => {
  const yaml = require("js-yaml");
  
  const tournamentTitle = state.info.title;
  
  const blob = new Blob([yaml.dump(state)], {type: "text/plain"});
  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download:`${tournamentTitle}.yaml`}
  );
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
}

export default download;