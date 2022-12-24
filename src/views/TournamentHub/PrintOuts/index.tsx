import Button from "../../../components/Button";
import PrintableIframe from "../../../components/PrintableIframe";
import { Routes } from "../../../utils/routeUtils";

const PlayerSchedules = () => {
	const print = (target: string) => {
		const iframe = document.getElementById(target) as HTMLIFrameElement;
		if (iframe !== null && "contentWindow" in iframe)
		{
			iframe?.contentWindow?.print();
		}
	};

	return (
		<div>
			<h1>Print-outs</h1>
			<p>Print-outs can be printed on paper or exported to PDF (requires a print-to-PDF thingy).</p>
			<h2>Full schedule (NYI)</h2>
			<Button
				label={"Print full schedule"}
				subLabel={"(not yet implemented)"}
				onClick={() => print("full-schedule")}
			/>
			<PrintableIframe
				id={"full-schedule"}
				src={Routes.FullSchedule}
			/>
			<h2>Personal schedules</h2>
			<Button
				label={"Print personal schedules"}
				onClick={() => print("personal-schedules")}
			/>
			<PrintableIframe
				id={"personal-schedules"}
				src={Routes.PrintPersonalSchedules}
			/>
			<h2>Table score forms (NYI)</h2>
			<p>Hint: if your printer supports printing on both sides, select that option. Otherwise print odd-numbered pages first, then flip the sheets, and print even-numbered pages.</p>
			<Button
				label={"Print score forms"}
				subLabel={"(not yet implemented)"}
				onClick={() => print("score-forms")}
			/>
			<PrintableIframe
				id={"score-forms"}
				src={Routes.PrintScoreForms}
			/>
		</div>
	);
};

export default PlayerSchedules;