import { useState } from "react";
import UpArrowIcon from "./icons/upArrow";
import DownArrowIcon from "./icons/downArrow";

export type SearchOption = {
  label: string;
  id: string;
};

interface InputSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  onSelectOption: (e: SearchOption) => void;
  items: Array<SearchOption>;
  className?: string;
  readOnly?: boolean;
}

const StyledInputSelect = ({
  label,
  errorText,
  onSelectOption,
  className,
  items,
  readOnly,
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
          className={`flex flex-row justify-between border text-text border-gray bg-transparent rounded-md w-full p-2 hover:cursor-pointer
                ${errorText ? "border border-error" : ""} ${className}`}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <input
            type="text"
            className={`w-full border-none focus:ring-0 focus:outline-none hover:cursor-pointer`}
            autoComplete="off"
            readOnly={readOnly ?? true}
            {...props}
          />
          {open ? (
            <button className="hover:cursor-pointer" type={"button"}>
              <UpArrowIcon heigth={24} width={24} color={"#717170"} />
            </button>
          ) : (
            <button className="hover:cursor-pointer" type={"button"}>
              <DownArrowIcon heigth={24} width={24} color={"#717170"} />
            </button>
          )}
        </div>
        {open && (
          <div className="w-full mx-auto mt-1 max-h-[150px] overflow-y-auto absolute z-50 card shadow-md border border-gray-light rounded-md gap-3 bg-main-bg relative text-text">
            {items.length > 0 ? (
              items.map((e, i) => {
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
              })
            ) : (
              <p className="p-2 text-center">No se encontraron opciones</p>
            )}
          </div>
        )}
      </div>

      <p className="text-left text-error font-xs"></p>
    </div>
  );
};

export default StyledInputSelect;
