import { useEffect } from "react";
import StyledButton from "../components/button";
import InputTypeAhead from "../components/inputTypeAhead";
import StyledPill from "../components/pill";
import StyledTable from "../components/table";
import { useOrdersStore } from "../store/orders";
import type { Order } from "../types/order";
import type { Column } from "../types/table";
import { getOrdersList } from "../api/orderServices";
import { useNavigate } from "react-router-dom";

const OrdersListing = () => {
  const navigate = useNavigate();
  const { ordersList, ordersLoading, ordersError } = useOrdersStore();

  useEffect(() => {
    getOrdersList();
  }, []);

  const columns: Array<Column<Order>> = [
    {
      key: "id",
      header: "No. de pedido",
    },
    {
      key: "userId",
      header: "Usuario",
    },
    {
      key: "quantity",
      header: "Productos",
    },
    {
      key: "status",
      header: "Estatus",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-start">
            <StyledPill value={row.status} />
          </div>
        );
      },
    },
    {
      key: "total",
      header: "Total",
    },
    {
      key: "id",
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("edit" + row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={24}
              height={24}
            >
              <path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" />
            </svg>
          </button>
        );
      },
    },
    {
      key: "id",
      header: "",
      render: (_, row) => {
        return (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("delete" + row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={24}
              height={24}
            >
              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
            </svg>
          </button>
        );
      },
    },
  ];

  if (ordersLoading) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h1>{ordersError}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="ms-1 text-text">Listado de ordenes</h1>
      <div className="flex flex-col min-w-8/10 sm:min-w-9/10 card shadow-md border border-gray-light rounded-xl items-center justify-center p-8 gap-3 relative">
        <div className="flex w-full justify-end gap-2">
          <InputTypeAhead
            placeholder="Introduce No. de pedido"
            onChange={() => {}}
          />
          <StyledButton variety="primary" onClick={() => {}}>
            Buscar
          </StyledButton>
        </div>
        <StyledTable
          elements={ordersList}
          columns={columns}
          onSelectRow={(id) => {
            navigate(`/orders/${id}`);
          }}
        />
        <div className="flex flex-row gap-2 mt-5 justify-end w-full">
          <StyledButton variety="secondary" onClick={() => {}}>
            + Crear usuario
          </StyledButton>
          <StyledButton variety="primary" onClick={() => {}}>
            + Crear orden
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default OrdersListing;
