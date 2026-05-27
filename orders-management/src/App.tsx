import { useEffect } from "react";
import "./App.css";
import { useThemeStore } from "./store/theme";
import OrdersListing from "./pages/OrdersListing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderDetails from "./pages/OrderDetails";
import MainLayout from "./pages/MainLayout";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/orders" element={<OrdersListing />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
