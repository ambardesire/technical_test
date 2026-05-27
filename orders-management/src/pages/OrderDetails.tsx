import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder } from "../api/orderServices";
import StyledContainer from "../components/container";
import { useOrdersStore } from "../store/orders";
import { getSingleUser } from "../api/userServices";
import { useUsersStore } from "../store/users";
import Loading from "../components/loading";
import StyledTable from "../components/table";
import type { Product } from "../types/product";
import type { Column } from "../types/table";
import IconTitle from "../components/iconTitle";
import DetailIcon from "../components/icons/detail";
import UserIcon from "../components/icons/user";
import ProductIcon from "../components/icons/product";
import LeftArrowIcon from "../components/icons/leftArrow";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { currentOrder, ordersLoading, ordersError } = useOrdersStore();
  const { currentUser, usersLoading, usersError } = useUsersStore();
  const navigate = useNavigate();

  const columns: Array<Column<Product>> = [
    {
      key: "id",
      header: "No. de pedido",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-start">
            <p>{`#${row.id.toUpperCase()}`}</p>
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Producto",
    },
    {
      key: "quantity",
      header: "Cantidad",
    },
    {
      key: "price",
      header: "Precio",
      render: (_, row) => {
        return (
          <div className="flex flex-col justify-center items-end">
            <p>{`$${row.price.toFixed(2)}`}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!orderId) return;

    getSingleOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    if (!currentOrder?.userId) return;

    getSingleUser(currentOrder.userId);
  }, [currentOrder]);

  if ((ordersLoading || usersLoading) && (!currentOrder || !currentUser)) {
    return <Loading />;
  }

  if (ordersError || usersError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h1>{ordersError}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-1 items-center ms-1 mb-3">
        <button
          onClick={() => navigate(`/orders`)}
          className="hover:cursor-pointer"
        >
          <LeftArrowIcon color={"#717170"} width={28} heigth={28} />
        </button>
        <h1 className="break-all text-text">
          Order #{orderId?.toLocaleUpperCase()}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StyledContainer className="col-span-2 md:col-span-1">
          <div>
            <IconTitle
              title={"Detalle del pedido"}
              icon={<DetailIcon width={16} heigth={16} color="white" />}
            />
            <div className="flex flex-col gap-1 mt-5">
              <p className="flex py-2 border-b border-b-gray-light justify-between">
                <strong>Dirección de entrega: </strong>
                {currentOrder?.address}
              </p>
              <p className="flex py-2 border-b border-b-gray-light justify-between">
                <strong>Costo total: </strong>
                {"$" + currentOrder?.total.toFixed(2)}
              </p>
              <p className="flex py-2 justify-between">
                <strong>Total de productos: </strong>
                {currentOrder?.quantity}
              </p>
            </div>
          </div>
        </StyledContainer>
        <StyledContainer className="col-span-2 md:col-span-1">
          <div>
            <IconTitle
              title={"Datos del usuario"}
              icon={<UserIcon width={18} heigth={18} color="white" />}
            />
            <div className="flex flex-col gap-1 mt-5">
              <p className="flex py-2 border-b border-b-gray-light justify-between">
                <strong>Nombre completo: </strong>
                {`${currentUser?.name} ${currentUser?.firstLastName} ${currentUser?.secondLastName}`}
              </p>
              <p className="flex py-2 justify-between">
                <strong>Correo: </strong>
                {currentUser?.id}
              </p>
            </div>
          </div>
        </StyledContainer>
      </div>
      <StyledContainer className="mt-8">
        <div className="flex flex-col gap-5">
          <IconTitle
            title={"Productos"}
            icon={<ProductIcon width={18} heigth={18} color="white" />}
          />
          <div className="flex flex-col">
            <StyledTable
              elements={currentOrder?.products ?? []}
              columns={columns}
            />
          </div>
          <div className="flex justify-end gap-8 me-1">
            <p className="font-bold">Total del pedido:</p>
            <p className="text-primary font-bold">{`$${currentOrder?.total.toFixed(2)}`}</p>
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};

export default OrderDetails;
