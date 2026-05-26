import StyledButton from "../components/button";
import InputTypeAhead from "../components/inputTypeAhead";
import StyledPill from "../components/pill";
import StyledTable from "../components/table";
import type { OrderItem } from "../types/orders";
import type { Column } from "../types/table";

const OrdersListing = () => {
  const columns: Array<Column<OrderItem>> = [
    {
      key: "order_id",
      header: "No. de pedido",
    },
    {
      key: "username",
      header: "Usuario",
    },
    {
      key: "products_qty",
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

  const orders: OrderItem[] = [
    {
      order_id: "1WERTYU52",
      products_qty: 3,
      status: "PENDING",
      total: 1560,
      username: "alex.sierra54@gmail.com",
    },
    {
      order_id: "1WERTYU52",
      products_qty: 3,
      status: "CANCELLED",
      total: 1560,
      username: "alex.sierra54@gmail.com",
    },
    {
      order_id: "1WERTYU52",
      products_qty: 3,
      status: "DELIVERED",
      total: 1560,
      username: "alex.sierra54@gmail.com",
    },
  ];

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
        <StyledTable elements={orders} columns={columns} />
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
