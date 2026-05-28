import { getDeleteOrder } from "../../api/orderServices";
import StyledModal from "../modal";

interface DeleteOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  orderId: string;
}
const DeleteOrderModal = ({
  open,
  orderId,
  onCancel,
  onClose,
}: DeleteOrderModalProps) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={(e) => {
        e?.preventDefault();
        getDeleteOrder(orderId);
      }}
      title="Eliminar orden"
    >
      <div className="flex w-full items-center py-6">
        <p className="text-xl text-center text-text">
          ¿Estas seguro de eliminar la orden {`#${orderId.toUpperCase()}`}?
        </p>
      </div>
    </StyledModal>
  );
};

export default DeleteOrderModal;
