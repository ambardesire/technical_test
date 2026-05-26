import StyledButton from "../components/button";
import StyledTable, { type Column } from "../components/table";

type OrderItem = {
  order_id: string;
  products_qty: number;
  status: string;
  total: number;
  username: string;
};

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

  const orders = [
    {
      order_id: "1WERTYU52",
      products_qty: 3,
      status: "PENDING",
      total: 1560,
      username: "alex.sierra54@gmail.com",
    },
  ];

  return (
    <div>
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
