import { useEffect } from "react";
import StyledButton from "../components/button";
import InputTypeAhead from "../components/inputTypeAhead";
import StyledPill from "../components/pill";
import StyledTable from "../components/table";
import { useOrdersStore } from "../store/orders";
import type { Order } from "../types/order";
import type { Column } from "../types/table";
import { getOrdersList } from "../api/services";

const OrdersListing = () => {
  const { ordersList, ordersLoading, ordersError } = useOrdersStore();

  useEffect(() => {
    getOrdersList();
  }, []);

  const columns: Array<Column<Order>> = [
    {
      key: "id",
      header: "No. de pedido",
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
    },
  ];

  {
    /*const orders: Order[] = [
    {
      id: "1WERTYU52",
      quantity: 3,
      status: "PENDING",
      total: 1560,
      userId: "alex.sierra54@gmail.com",
      address: "test addres 45 Mx",
      products: [],
    },
    {
      id: "1WERTYU52",
      quantity: 3,
      status: "CANCELLED",
      total: 1560,
      userId: "alex.sierra54@gmail.com",
      address: "test addres 45 Mx",
      products: [],
    },
    {
      id: "1WERTYU52",
      quantity: 3,
      status: "DELIVERED",
      total: 1560,
      userId: "alex.sierra54@gmail.com",
      address: "test addres 45 Mx",
      products: [],
    },
  ];*/
  }

  if (ordersLoading) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
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
      <h1 className="ms-1 text-text">Listado de ordenes</h1>
      <div className="flex flex-col min-w-8/10 sm:min-w-9/10 card shadow-md border border-gray-light rounded-xl items-center justify-center p-8 gap-3 relative">
        <div className="flex w-full justify-end gap-2">
          <InputTypeAhead
            placeholder="Introduce No. de pedido"
            onChange={() => {}}
          />
          <StyledButton variety="primary" onClick={() => {}}>
            Buscar
          </StyledButton>
        </div>
        <StyledTable elements={ordersList} columns={columns} />
        <div className="flex flex-row gap-2 mt-5 justify-end w-full">
          <StyledButton variety="secondary" onClick={() => {}}>
            + Crear usuario
          </StyledButton>
          <StyledButton variety="primary" onClick={() => {}}>
            + Crear orden
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default OrdersListing;
