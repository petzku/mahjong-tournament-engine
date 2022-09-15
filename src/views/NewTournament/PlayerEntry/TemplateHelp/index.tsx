import Popup from "../../../../components/Popup";

type TemplateHelpProps = {
  onClose: () => void
};

const TemplateHelp = (props: TemplateHelpProps) => {
  return (
    <Popup
      title={"Seating templates"}
      cancelHidden={true}
      cancelText={""}
      onCancel={() => {}}
      confirmText={"Close"}
      onConfirm={() => props.onClose()}>
      <p>A seating template dictates who sits at which table as which wind on each round. Generating good seatings is very difficult and Mahjong Tournament Engine currently only has a very bad generator algorithm. Therefore the Engine allows you to upload a handmade template that the Engine will then apply.</p>
      <h2>File format</h2>
      <p>The template file must be an Excel file (.xlsx)</p>
      <p>(unfinished, will continue later)</p>
    </Popup>
  );
};

export default TemplateHelp;