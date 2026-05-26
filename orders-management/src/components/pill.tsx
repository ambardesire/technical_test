import type { OrderStatus } from "../types/orders";
import { translateOrderStatus } from "../utils";

interface StyledPillProps {
  value: OrderStatus;
}

const StyledPill = ({ value }: StyledPillProps) => {
  return (
    <div
      className={`flex rounded-xl text-xs font-bold py-1 justify-center border border-solid w-[84px]
        ${
          value === "DELIVERED"
            ? "text-success border-success bg-success-light"
            : value === "CANCELLED"
              ? "text-error border-error bg-error-light"
              : "text-gray border-gray bg-gray-light"
        }`}
    >
      {translateOrderStatus(value)}
    </div>
  );
};

export default StyledPill;
