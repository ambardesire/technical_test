import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../api/orderServices";

const OrderDetails = () => {
  const { orderId } = useParams();
  useEffect(() => {
    getSingleOrder(orderId!);
  }, [orderId]);

  return (
    <div>
      <h1 className="text-text">Order details {orderId}</h1>
    </div>
  );
};

export default OrderDetails;
