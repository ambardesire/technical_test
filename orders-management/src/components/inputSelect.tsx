import { useState } from "react";
import UpArrowIcon from "./icons/upArrow";
import DownArrowIcon from "./icons/downArrow";

interface InputSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  onSelectOption: (e: { label: string; id: string }) => void;
  items: Array<{ label: string; id: string }>;
  className?: string;
}

const StyledInputSelect = ({
  label,
  errorText,
  onSelectOption,
  className,
  items,
  ...props
}: InputSelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${className} flex flex-col`}>
      {label && (
        <label className="text-md text-text ms-1 font-medium">{label}</label>
      )}
      <div className="w-full relative h-10">
        <div
          className={`flex flex-row justify-between border text-text border-gray bg-transparent rounded-md w-full p-2
                ${errorText ? "border border-error" : ""} ${className}`}
        >
          <input
            type="text"
            className={`border-none focus:ring-0 focus:outline-none`}
            autoComplete="off"
            readOnly
            {...props}
          />
          {open ? (
            <button
              className="hover:cursor-pointer"
              type={"button"}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <UpArrowIcon heigth={24} width={24} color={"#717170"} />
            </button>
          ) : (
            <button
              className="hover:cursor-pointer"
              type={"button"}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <DownArrowIcon heigth={24} width={24} color={"#717170"} />
            </button>
          )}
        </div>
        {open && (
          <div className="w-full mx-auto mt-1 max-h-[150px] overflow-y-auto absolute z-50 card shadow-md border border-gray-light rounded-md gap-3 bg-main-bg relative text-text">
            {items.map((e, i) => {
              return (
                <div
                  key={e.id}
                  onClick={() => {
                    onSelectOption(e);
                    setOpen((prev) => !prev);
                  }}
                  className={`p-2 hover:bg-primary-light hover:cursor-pointer
                        ${i === items.length - 1 ? "rounded-b-md" : "border-b border-b-gray-light"}
                        ${i === 0 ? "rounded-t-md" : ""}
                    `}
                >
                  {e.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-left text-error font-xs"></p>
    </div>
  );
};

export default StyledInputSelect;
