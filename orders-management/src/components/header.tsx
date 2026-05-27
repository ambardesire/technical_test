import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/theme";
import DarkThemeIcon from "./icons/darkTheme";
import LightThemeIcon from "./icons/lightTheme";
import LogoIcon from "./icons/logoIcon";

const StyledHeader = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <header className="flex flex-row w-full justify-between items-center bg-primary color-light h-[54px] px-8">
      <div
        className="flex flex-row gap-2 hover:cursor-pointer"
        onClick={() => {
          navigate(`/orders`);
        }}
      >
        <LogoIcon />
        <h3 className="flex items-center text-white font-bold">OMS</h3>
      </div>

      {theme === "light" ? (
        <div className="hover:cursor-pointer" onClick={() => setTheme("dark")}>
          <DarkThemeIcon />
        </div>
      ) : (
        <div className="hover:cursor-pointer" onClick={() => setTheme("light")}>
          <LightThemeIcon />
        </div>
      )}
    </header>
  );
};

export default StyledHeader;
