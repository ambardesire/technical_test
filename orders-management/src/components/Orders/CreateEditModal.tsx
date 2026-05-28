import { useEffect, useState } from "react";
import {
  getCreateOrder,
  getSingleOrder,
  getUpdateOrder,
} from "../../api/orderServices";
import StyledModal from "../modal";
import type { Order, OrderPayload, OrderStatus } from "../../types/order";
import StyledInput from "../input";
import StyledInputSelect from "../inputSelect";
import { statusValues } from "../../utils/constants";
import { getUsersList } from "../../api/userServices";
import { useUsersStore } from "../../store/users";
import Loading from "../loading";
import { translateOrderStatus } from "../../utils";
import ProductForm from "./ProductForm";
import IconTitle from "../iconTitle";
import ProductIcon from "../icons/product";
import StyledButton from "../button";
import { useOrdersStore } from "../../store/orders";

interface CreateEditOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  orderId?: string | null;
}
const CreateEditOrderModal = ({
  open,
  onCancel,
  onClose,
  orderId,
}: CreateEditOrderModalProps) => {
  const [error, setError] = useState("");
  const { usersList, usersLoading, usersError } = useUsersStore();
  const { ordersLoading, ordersError, currentOrder } = useOrdersStore();

  const initialOrder: OrderPayload = currentOrder
    ? {
        address: currentOrder.address,
        products: currentOrder.products,
        status: currentOrder.status,
        userId: currentOrder.userId,
      }
    : {
        address: "",
        products: [{ name: "", price: 0, quantity: 1, id: "" }],
        status: "",
        userId: "",
      };
  const [newOrder, setNewOrder] = useState<OrderPayload>(() => {
    if (orderId && currentOrder) {
      return {
        address: currentOrder.address,
        products: currentOrder.products,
        status: currentOrder.status,
        userId: currentOrder.userId,
      };
    }
    return {
      address: "",
      products: [{ name: "", price: 0, quantity: 1, id: "" }],
      status: "",
      userId: "",
    };
  });

  const usersOptions = usersList.map((usuario) => ({
    label: usuario.id,
    id: usuario.id,
  }));
  const isDisabled =
    newOrder.address.length === 0 ||
    newOrder.status.length === 0 ||
    newOrder.userId.length === 0 ||
    newOrder.products.length === 0 ||
    !newOrder.products.every(
      (product) =>
        product.name !== "" && product.price > 0 && product.quantity > 0,
    );

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (!orderId) return;
    if (currentOrder && (currentOrder as Order).id === orderId) {
      return;
    }
    getSingleOrder(orderId);
  }, [orderId, currentOrder]);

  useEffect(() => {
    if (orderId && currentOrder) {
      const handler = setTimeout(() => {
        setNewOrder({
          address: currentOrder.address,
          products: currentOrder.products,
          status: currentOrder.status,
          userId: currentOrder.userId,
        });
      }, 0);
      return () => clearTimeout(handler);
    }
  }, [currentOrder, orderId]);

  const handleCreateOrder = () => {
    if (orderId) {
      getUpdateOrder(newOrder, orderId);
    } else getCreateOrder(newOrder);
  };

  const handleAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const lastAddedProduct = newOrder.products[newOrder.products.length - 1];

    // Verify if last added product has all element to add another item
    const isValid =
      lastAddedProduct &&
      lastAddedProduct.name !== "" &&
      lastAddedProduct.id !== "" &&
      lastAddedProduct.price > 0 &&
      lastAddedProduct.quantity > 0;

    if (isValid || newOrder.products.length === 0) {
      setNewOrder((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          { name: "", price: 0, quantity: 1, id: "" },
        ],
      }));
    } else {
      setError(
        "Por favor, completa los datos del producto actual antes de agregar otro.",
      );
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setNewOrder((previous) => ({
      ...previous,
      products: previous.products.filter((_, index) => index !== productId),
    }));
  };

  if (usersLoading || ordersLoading) {
    return <Loading />;
  }

  if (usersError || ordersError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h1>{usersError}</h1>
      </div>
    );
  }

  return (
    <StyledModal
      open={open}
      onClose={() => {
        setNewOrder(initialOrder);
        onClose();
      }}
      onCancel={() => {
        setNewOrder(initialOrder);
        onCancel();
      }}
      disabled={isDisabled}
      onConfirm={handleCreateOrder}
      title={orderId ? "Modificar orden" : "Crear nueva orden"}
    >
      <div>
        <div className="flex flex-col w-full border-b border-b-gray-light p-6 pt-3 gap-5">
          {orderId && (
            <p className="font-bold">Orden {`#${orderId?.toUpperCase()}`}</p>
          )}
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <StyledInputSelect
                label={"Usuario"}
                name={"user"}
                defaultValue={newOrder.userId}
                placeholder={"Selecciona un usuario"}
                className="w-full"
                onSelectOption={(e) =>
                  setNewOrder((previous) => ({
                    ...previous,
                    userId: e.id,
                  }))
                }
                items={usersOptions}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <StyledInputSelect
                label={"Estatus"}
                name={"status"}
                defaultValue={
                  newOrder.status === ""
                    ? ""
                    : translateOrderStatus(newOrder.status)
                }
                placeholder={"Asigna un estatus"}
                className="w-full"
                onSelectOption={(e) =>
                  setNewOrder((previous) => ({
                    ...previous,
                    status: e.id as OrderStatus,
                  }))
                }
                items={statusValues}
              />
            </div>
          </div>
          <StyledInput
            name="address"
            label="Dirección"
            value={newOrder.address}
            className="w-full"
            onChange={(e) =>
              setNewOrder((previous) => ({
                ...previous,
                address: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between p-6 pb-0">
            <IconTitle
              title={"Productos"}
              icon={<ProductIcon width={18} heigth={18} color="white" />}
            />
            <StyledButton
              variety="secondary"
              onClick={handleAddProduct}
              type={"button"}
            >
              + Agregar item
            </StyledButton>
          </div>
          {newOrder.products.map((product, index) => (
            <ProductForm
              index={index}
              key={index}
              product={product}
              onChange={() => setError("")}
              setNewOrder={setNewOrder}
              onDeleteProduct={handleRemoveProduct}
              hasOnlyOneProduct={Boolean(newOrder.products.length === 1)}
            />
          ))}
        </div>
        {error && (
          <p className="text-sm text-error-light text-left ps-6">*{error}</p>
        )}
      </div>
    </StyledModal>
  );
};

export default CreateEditOrderModal;
