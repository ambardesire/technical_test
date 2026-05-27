interface IconTitleProps {
  title: string;
  icon: React.ReactNode;
}

const IconTitle = ({ title, icon }: IconTitleProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex h-7 w-7 bg-primary items-center justify-center rounded-full">
        {icon}
      </div>
      <h2 className="text-text">{title}</h2>
    </div>
  );
};

export default IconTitle;
