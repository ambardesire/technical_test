import type { OrderStatus } from "../types/orders";

export const translateOrderStatus = (status: OrderStatus) => {
  const translations: Record<OrderStatus, string> = {
    PENDING: "Pendiente",
    DELIVERED: "Completada",
    CANCELLED: "Cancelada",
  };

  return translations[status];
};
