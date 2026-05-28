import type React from "react";

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variety: "primary" | "secondary";
  children: string | React.ReactNode;
}

const StyledButton = ({ children, variety, ...props }: StyledButtonProps) => {
  const customStyle =
    variety === "primary"
      ? "bg-primary color-light text-light"
      : "bg-light color-primary text-primary";
  return (
    <button
      className={`${customStyle} px-5 py-2 border-color-primary border rounded-md font-bold hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-60`}
      {...props}
    >
      {children}
    </button>
  );
};

export default StyledButton;
