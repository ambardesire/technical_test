import StyledButton from "./button";
import CloseIcon from "./icons/close";
import IconTitle from "./iconTitle";

interface StyledModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (e?: React.SyntheticEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}
const StyledModal = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  icon,
  children,
  disabled,
}: StyledModalProps) => {
  return (
    <div
      id="modal"
      className={`${open ? "flex" : "hidden"} fixed items-center justify-center inset-0 z-100 bg-black/40 backdrop-blur-sm`}
    >
      <div className="card overflow-y-auto max-h-9/10 w-[90%] max-w-[620px] rounded-xl border border-gray-light bg-main-bg shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (disabled) return;

            onConfirm(e);
            onClose();
          }}
        >
          <div
            id="modal-header"
            className="flex justify-between border-b border-b-gray-light p-3"
          >
            {icon ? (
              <IconTitle title={title} icon={icon} />
            ) : (
              <h2 className="text-text">{title}</h2>
            )}
            <button
              onClick={() => {
                onClose();
              }}
              className="hover:cursor-pointer"
            >
              <CloseIcon color={"#717170"} width={24} heigth={24} />
            </button>
          </div>
          <div id="modal-body" className="flex p-3">
            {children}
          </div>
          <div
            id={"modal-footer"}
            className="flex justify-end border-t border-t-gray-light p-3 gap-4"
          >
            <StyledButton
              variety="secondary"
              type={"button"}
              onClick={onCancel}
            >
              Cancelar
            </StyledButton>
            <StyledButton variety="primary" type="submit" disabled={disabled}>
              Confirmar
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StyledModal;
