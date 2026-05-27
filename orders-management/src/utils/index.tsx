import type { OrderStatus } from "../types/order";

export const translateOrderStatus = (status: OrderStatus) => {
  const translations: Record<OrderStatus, string> = {
    PENDING: "Pendiente",
    DELIVERED: "Completada",
    CANCELLED: "Cancelada",
    TRANSIT: "En tránsito",
  };

  return translations[status];
};
