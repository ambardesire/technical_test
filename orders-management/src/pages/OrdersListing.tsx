import { useEffect } from "react";
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

const OrdersListing = () => {
  const navigate = useNavigate();
  const { ordersList, ordersLoading, ordersError } = useOrdersStore();

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
      key: "id",
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("edit" + row.id);
            }}
          >
            <EditIcon />
          </button>
        );
      },
    },
    {
      key: "id",
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("delete" + row.id);
            }}
          >
            <DeleteIcon />
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
      <h1 className="ms-1 text-text mb-3">Listado de ordenes</h1>
      <StyledContainer>
        <div className="flex w-full justify-end gap-2 mb-3">
          <InputTypeAhead
            placeholder="Introduce No. de pedido"
            onChange={() => {}}
          />
          <StyledButton variety="primary" onClick={() => {}}>
            Buscar
          </StyledButton>
        </div>
        <StyledTable
          elements={ordersList}
          columns={columns}
          onSelectRow={(id) => {
            navigate(`/orders/${id}`);
          }}
        />
        <div className="flex flex-row gap-2 mt-5 justify-end w-full">
          <StyledButton variety="secondary" onClick={() => {}}>
            + Crear usuario
          </StyledButton>
          <StyledButton variety="primary" onClick={() => {}}>
            + Crear orden
          </StyledButton>
        </div>
      </StyledContainer>
    </div>
  );
};

export default OrdersListing;
