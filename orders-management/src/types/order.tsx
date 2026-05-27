import type { Product } from "./product";

export type OrderStatus = "PENDING" | "DELIVERED" | "TRANSIT" | "CANCELLED";

export type Order = {
  id: string;
  products: Product[];
  quantity: number;
  status: OrderStatus;
  total: number;
  userId: string;
  address: string;
};

export type OrderPayload = {
  products: Product[];
  status: OrderStatus;
  userId: string;
  address: string;
};
