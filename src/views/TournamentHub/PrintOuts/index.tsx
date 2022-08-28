import PrintableIframe from "../../../components/PrintableIframe";
import { Routes } from "../../../utils/routeUtils";
import HubTabs from "../HubTabs";

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
      <HubTabs/>
      <h1>Print-outs</h1>
      <p>Print-outs can be printed on paper or exported to PDF (requires a print-to-PDF thingy).</p>
      <h2>Full schedule</h2>
      <button onClick={(): void => print("fullschedule")}>Print full schedule</button>
      <PrintableIframe
        id={"fullschedule"}
        src={Routes.FullSchedule}
      />
      <h2>Personal schedules</h2>
      <button onClick={(): void => print("personalschedules")}>Print personal schedules</button>
      <PrintableIframe
        id={"personalschedules"}
        src={Routes.PrintPersonalSchedules}
      />
      <h2>Table signs</h2>
      <button onClick={(): void => print("tablesigns")}>Print table signs</button>
      <PrintableIframe
        id={"tablesigns"}
        src={Routes.PrintTableSigns}
      />
    </div>
  );
};

export default PlayerSchedules;