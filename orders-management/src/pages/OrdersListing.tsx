import { useEffect, useState } from "react";
import StyledButton from "../components/button";
import InputTypeAhead from "../components/inputTypeAhead";
import StyledPill from "../components/pill";
import StyledTable from "../components/table";
import { useOrdersStore } from "../store/orders";
import type { Order } from "../types/order";
import type { Column } from "../types/table";
import { getOrdersList } from "../api/orderServices";
import { useNavigate } from "react-router-dom";
import StyledContainer from "../components/container";
import Loading from "../components/loading";
import EditIcon from "../components/icons/edit";
import DeleteIcon from "../components/icons/delete";
import { useThemeStore } from "../store/theme";
import DeleteOrderModal from "../components/Orders/DeleteModal";
import CreateEditOrderModal from "../components/Orders/CreateEditModal";
import CreateEditUserModal from "../components/Users/CreateEditModal";

type OpenModal = {
  isOpen: boolean;
  type: "edit" | "delete" | "create" | "createUser" | "";
  id: string | null;
};

const OrdersListing = () => {
  const navigate = useNavigate();
  const { ordersList, ordersLoading, ordersError, resetOrder } =
    useOrdersStore();
  const { theme } = useThemeStore();
  const [openModal, setOpenModal] = useState<OpenModal>({
    isOpen: false,
    type: "",
    id: null,
  });

  useEffect(() => {
    getOrdersList();
  }, []);

  const columns: Array<Column<Order>> = [
    {
      key: "id",
      header: "No. de pedido",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-start">
            <p>{`#${row.id.toUpperCase()}`}</p>
          </div>
        );
      },
    },
    {
      key: "userId",
      header: "Usuario",
    },
    {
      key: "quantity",
      header: "Productos",
    },
    {
      key: "status",
      header: "Estatus",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-start">
            <StyledPill value={row.status} />
          </div>
        );
      },
    },
    {
      key: "total",
      header: "Total",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-start">
            <p>{`$${row.total.toFixed(2)}`}</p>
          </div>
        );
      },
    },
    {
      key: "action-edit" as keyof Order,
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal({ isOpen: true, type: "edit", id: row.id });
            }}
          >
            <EditIcon />
          </button>
        );
      },
    },
    {
      key: "action-delete" as keyof Order,
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal({ isOpen: true, type: "delete", id: row.id });
            }}
          >
            <DeleteIcon
              width={24}
              heigth={24}
              color={theme === "dark" ? "#fffdf0" : "#151515"}
            />
          </button>
        );
      },
    },
  ];

  if (ordersLoading) {
    return <Loading />;
  }

  if (ordersError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h1>{ordersError}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <CreateEditOrderModal
        open={openModal.isOpen && openModal.type === "create"}
        onClose={() => setOpenModal({ isOpen: false, type: "", id: null })}
        onCancel={() => setOpenModal({ isOpen: false, type: "", id: null })}
        orderId={null}
      />
      <CreateEditOrderModal
        open={openModal.isOpen && openModal.type === "edit"}
        onClose={() => setOpenModal({ isOpen: false, type: "", id: null })}
        onCancel={() => setOpenModal({ isOpen: false, type: "", id: null })}
        orderId={openModal.id}
      />
      <CreateEditUserModal
        open={openModal.isOpen && openModal.type === "createUser"}
        onClose={() => setOpenModal({ isOpen: false, type: "", id: null })}
        onCancel={() => setOpenModal({ isOpen: false, type: "", id: null })}
      />
      <DeleteOrderModal
        open={openModal.isOpen && openModal.type === "delete"}
        onClose={() => setOpenModal({ isOpen: false, type: "", id: null })}
        onCancel={() => setOpenModal({ isOpen: false, type: "", id: null })}
        orderId={openModal.id ?? ""}
      />
      <h1 className="ms-1 text-text mb-3">Listado de órdenes</h1>
      <StyledContainer>
        <div className="flex w-full justify-start gap-2 mb-3">
          <InputTypeAhead />
        </div>
        <StyledTable
          elements={ordersList}
          columns={columns}
          onSelectRow={(id) => {
            navigate(`/orders/${id}`);
          }}
          noData="No se encontraron registros de órdenes."
        />
        <div className="flex flex-row gap-2 mt-5 justify-end w-full">
          <StyledButton
            variety="secondary"
            onClick={() => {
              setOpenModal({ isOpen: true, type: "createUser", id: null });
            }}
          >
            + Crear usuario
          </StyledButton>
          <StyledButton
            variety="primary"
            onClick={() => {
              resetOrder();
              setOpenModal({ isOpen: true, type: "create", id: null });
            }}
          >
            + Crear orden
          </StyledButton>
        </div>
      </StyledContainer>
    </div>
  );
};

export default OrdersListing;
