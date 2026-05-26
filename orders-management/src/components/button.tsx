import type React from "react";

interface StyledButtonProps {
  variety: "primary" | "secondary";
  children: string | React.ReactNode;
  onClick: () => void;
}

const StyledButton = ({ children, variety, onClick }: StyledButtonProps) => {
  const customStyle =
    variety === "primary"
      ? "bg-primary color-light text-light"
      : "bg-light color-primary text-primary";
  return (
    <button
      className={`${customStyle} px-5 py-2 border-color-primary border rounded-md font-bold `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StyledButton;
