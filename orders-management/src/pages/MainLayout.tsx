import { Outlet } from "react-router-dom";
import StyledHeader from "../components/header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-main-bg">
      <StyledHeader />
      <main className="min-h-screen w-full overflow-x-auto px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
