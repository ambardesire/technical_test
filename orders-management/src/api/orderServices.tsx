import { useOrdersStore } from "../store/orders";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getOrdersList = async () => {
  const { setOrdersLoading, setOrdersError, setOrdersList } =
    useOrdersStore.getState();

  try {
    setOrdersLoading(true);
    setOrdersError(null);
    const response = await fetch(`${BASE_URL}/orders`);

    setOrdersList(await response.json());
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "There was an error trying to fetch the orders.",
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

    setCurrentOrder(await response.json());
  } catch (error) {
    setOrdersError(
      error instanceof Error
        ? error.message
        : "There was an error trying to fetch the order details.",
    );
  } finally {
    setOrdersLoading(false);
  }
};
