import { create } from "zustand";
import type { Order } from "../types/order";

interface OrdersStore {
  ordersList: Order[];
  currentOrder: Order | null;
  ordersLoading: boolean;
  ordersError: string | null;
  setOrdersList: (orders: Order[]) => void;
  setCurrentOrder: (order: Order | null) => void;
  setOrdersLoading: (loading: boolean) => void;
  setOrdersError: (error: string | null) => void;
  resetOrder: () => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  ordersList: [],
  setOrdersList: (orders) =>
    set({
      ordersList: orders,
    }),
  currentOrder: null,
  setCurrentOrder: (order) =>
    set({
      currentOrder: order,
    }),
  ordersLoading: false,
  setOrdersLoading: (loading) =>
    set({
      ordersLoading: loading,
    }),
  ordersError: null,
  setOrdersError: (error) =>
    set({
      ordersError: error,
    }),
  resetOrder: () =>
    set({
      currentOrder: null,
      ordersLoading: false,
      ordersError: null,
    }),
}));
