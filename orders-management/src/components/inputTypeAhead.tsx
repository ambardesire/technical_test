import { useState } from "react";
import { useOrdersStore } from "../store/orders";
import StyledInputSelect, {
  type SearchOption,
} from "../components/inputSelect";
import { getOrdersList, getSearchOrders } from "../api/orderServices";
import StyledButton from "./button";

const InputTypeAhead = () => {
  const [searchValue, setSearchValue] = useState("");
  const { ordersList } = useOrdersStore();

  const getSuggestions = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    if (!lowerCaseValue) return [];

    const statusSuggestions = [
      { label: "Pendiente", id: "PENDING" },
      { label: "Completada", id: "DELIVERED" },
      { label: "Cancelada", id: "CANCELLED" },
      { label: "En tránsito", id: "TRANSIT" },
    ].filter((s) => s.label.toLowerCase().includes(lowerCaseValue));

    const uniqueUsers = Array.from(
      new Set(ordersList.map((order) => order.userId)),
    );
    const userSuggestions = uniqueUsers
      .filter((user) => user.toLowerCase().includes(lowerCaseValue))
      .map((user) => ({ label: user, id: user }));

    return [...statusSuggestions, ...userSuggestions];
  };

  const suggestions = getSuggestions(searchValue);

  return (
    <div className="flex flex-row w-full gap-3 items-end justify-end">
      <StyledInputSelect
        className="w-[400px]"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        items={suggestions}
        readOnly={false}
        onSelectOption={(option: SearchOption) => {
          setSearchValue(option.label);
          getSearchOrders(option.id);
        }}
        placeholder="Ingresa un No. de orden, usuario o estatus..."
      />
      <div>
        <StyledButton
          variety="primary"
          className="w-[240px] p-2"
          onClick={() => {
            setSearchValue("");
            getOrdersList();
          }}
        >
          Limpiar búsqueda
        </StyledButton>
      </div>
    </div>
  );
};

export default InputTypeAhead;
