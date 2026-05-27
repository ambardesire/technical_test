interface StyledContainerProps {
  children: React.ReactNode;
  className?: string;
}
const StyledContainer = ({ children, className }: StyledContainerProps) => {
  return (
    <div
      className={`w-full max-w-7xl mx-auto card shadow-md border border-gray-light rounded-2xl p-8 gap-3 relative ${className}`}
    >
      <div className="w-full overflow-x-auto md: overflow-x-visible">
        <div className="md:min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default StyledContainer;
