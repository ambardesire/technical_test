interface InputTypeAheadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  className?: string;
}

const StyledInput = ({
  label,
  errorText,
  onChange,
  className,
  ...props
}: InputTypeAheadProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-md text-text ms-1 font-medium">{label}</label>
      )}
      <input
        type="text"
        onChange={(e) => {
          onChange(e);
        }}
        className={`border text-text border-gray bg-transparent rounded-md w-full p-2 focus:border-primary focus:ring-0 focus:outline-none disabled:opacity-60 
            ${errorText ? "border border-error" : ""} ${className}`}
        {...props}
      />
      <p className="text-left text-error font-xs"></p>
    </div>
  );
};

export default StyledInput;
