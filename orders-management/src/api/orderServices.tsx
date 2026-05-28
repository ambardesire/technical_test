import { useOrdersStore } from "../store/orders";
import type { Order, OrderPayload } from "../types/order";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getOrdersList = async () => {
  const { setOrdersLoading, setOrdersError, setOrdersList } =
    useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders`);

    if (!response.ok) {
      throw new Error(
        "Hubo un error al obtener las órdenes. Intenta de nuevo más tarde.",
      );
    }

    setOrdersList(await response.json());
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al obtener las órdenes. Intenta de nuevo más tarde.",
    );
  } finally {
    setOrdersLoading(false);
  }
};

export const getSingleOrder = async (orderId: string) => {
  const { setOrdersLoading, setOrdersError, setCurrentOrder } =
    useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders/${orderId}`);

    if (!response.ok) {
      throw new Error(
        "Hubo un error al obtener la orden. Intenta de nuevo más tarde.",
      );
    }

    setCurrentOrder(await response.json());
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al obtener la orden. Intenta de nuevo más tarde.",
    );
  } finally {
    setOrdersLoading(false);
  }
};

export const getCreateOrder = async (order: OrderPayload) => {
  const { setOrdersLoading, setOrdersError, setOrdersList } =
    useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(
        "Hubo un error al crear la orden. Intenta de nuevo más tarde.",
      );
    }

    const updatedOrders: Order[] = await response.json();
    setOrdersList(updatedOrders);

    return updatedOrders;
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al crear la orden. Intenta de nuevo más tarde.",
    );
  } finally {
    setOrdersLoading(false);
  }
};

export const getUpdateOrder = async (order: OrderPayload, orderId: string) => {
  const { setOrdersLoading, setOrdersError } = useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(
        "Hubo un error al editar la orden. Intenta de nuevo más tarde.",
      );
    }

    await getOrdersList();
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al editar la orden. Intenta de nuevo más tarde.",
    );
  } finally {
    setOrdersLoading(false);
  }
};

export const getDeleteOrder = async (orderId: string) => {
  const { setOrdersLoading, setOrdersError } = useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        "Hubo un error al editar la orden. Intenta de nuevo más tarde.",
      );
    }
    await getOrdersList();
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al editar la orden. Intenta de nuevo más tarde.",
    );
  } finally {
    setOrdersLoading(false);
  }
};
