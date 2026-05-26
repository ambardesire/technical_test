interface InputTypeAheadProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

const InputTypeAhead = ({ placeholder, onChange }: InputTypeAheadProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="border text-text border-gray-light bg-transparent rounded-md w-full p-2"
      />
    </div>
  );
};

export default InputTypeAhead;
