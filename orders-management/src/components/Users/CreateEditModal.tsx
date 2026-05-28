import { useState } from "react";
import StyledModal from "../modal";
import StyledInput from "../input";
import { getCreateUser } from "../../api/userServices";
import type { User } from "../../types/user";

interface CreateEditUserModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}
const CreateEditUserModal = ({
  open,
  onCancel,
  onClose,
}: CreateEditUserModalProps) => {
  const initialUser: User = {
    id: "",
    name: "",
    firstLastName: "",
    secondLastName: "",
  };
  const [newUser, setNewUser] = useState<User>(initialUser);

  const isDisabled =
    newUser.name.length === 0 ||
    newUser.id.length === 0 ||
    newUser.firstLastName.length === 0 ||
    newUser.secondLastName.length === 0;

  const handleCreateUser = () => {
    getCreateUser(newUser);
  };

  return (
    <StyledModal
      open={open}
      onClose={() => {
        onClose();
      }}
      onCancel={() => {
        onCancel();
      }}
      disabled={isDisabled}
      onConfirm={handleCreateUser}
      title={"Crear nuevo usuario"}
    >
      <div className="flex flex-col w-full p-6 pt-3 gap-5">
        <StyledInput
          name="email"
          label="Email"
          placeholder="ejemplo@correo.com"
          value={newUser.id}
          className="w-full"
          onChange={(e) =>
            setNewUser((previous) => ({
              ...previous,
              id: e.target.value,
            }))
          }
        />
        <StyledInput
          name="name"
          label="Nombre"
          placeholder="Ingresa nombre"
          value={newUser.name}
          className="w-full"
          onChange={(e) =>
            setNewUser((previous) => ({
              ...previous,
              name: e.target.value,
            }))
          }
        />
        <StyledInput
          name="firsLastName"
          label="Apellido paterno"
          placeholder="Ingresa apellido paterno"
          value={newUser.firstLastName}
          className="w-full"
          onChange={(e) =>
            setNewUser((previous) => ({
              ...previous,
              firstLastName: e.target.value,
            }))
          }
        />
        <StyledInput
          name="secondLastName"
          label="Apellido materno"
          placeholder="Ingresa apellido materno"
          value={newUser.secondLastName}
          className="w-full"
          onChange={(e) =>
            setNewUser((previous) => ({
              ...previous,
              secondLastName: e.target.value,
            }))
          }
        />
      </div>
    </StyledModal>
  );
};

export default CreateEditUserModal;
