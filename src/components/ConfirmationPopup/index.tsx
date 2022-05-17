import "./ConfirmationPopup.scss";

type ConfirmationPopupProps = {
  title: string,
  children: React.ReactNode,
  cancelText: string,
  confirmText: string,
  onCancel: () => void,
  onConfirm: () => void
  cancelHidden?: boolean,
  confirmHidden?: boolean
}

const ConfirmationPopup = (props: ConfirmationPopupProps) => {
  return (
    <div className={"popup-backdrop"}>
      <div className={"popup"}>
        <div className={"title"}>
          {props.title}
        </div>
        <div className={"content"}>
          {props.children}
        </div>
        <div className={"buttons"}>
          {
            !props.cancelHidden &&
            <button onClick={() => props.onCancel()}>{props.cancelText}</button>
          }
          {
            !props.confirmHidden &&
            <button onClick={() => props.onConfirm()}>{props.confirmText}</button>
          }
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;