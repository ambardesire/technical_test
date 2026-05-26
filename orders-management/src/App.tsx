import "./App.css";
import StyledHeader from "./components/header";
import OrdersListing from "./pages/OrdersListing";

function App() {
  return (
    <div className="min-h-screen bg-main-bg flex flex-col">
      <section id="header">
        <StyledHeader />
      </section>

      <section id="main-container">
        <div className="flex flex-col items-center justify-center p-6">
          <OrdersListing />
        </div>
      </section>

      <section id="footer"></section>
    </div>
  );
}

export default App;
