export type OrderStatus = "PENDING" | "DELIVERED" | "RETURNED";

export type OrderItem = {
  order_id: string;
  products_qty: number;
  status: OrderStatus;
  total: number;
  username: string;
};
