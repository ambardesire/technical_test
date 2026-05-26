import StyledButton from "../components/button";
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
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Ordenes</h1>
      <StyledButton variety="primary" onClick={() => {}}>
        Buscar
      </StyledButton>
      <StyledButton variety="secondary" onClick={() => {}}>
        Buscar
      </StyledButton>
      <StyledTable elements={orders} columns={columns} />
    </div>
  );
};

export default OrdersListing;
