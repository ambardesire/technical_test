import { Outlet } from "react-router-dom";
import StyledHeader from "../components/header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-main-bg flex flex-col">
      <StyledHeader />
      <main className="flex flex-1 w-full justify-center items-center overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
