import type { Product } from "../../types/product";
import StyledInput from "../input";
import StyledInputSelect from "../inputSelect";
import type { OrderPayload } from "../../types/order";
import DeleteIcon from "../icons/delete";

interface ProductFormProps {
  index: number;
  product: Product;
  onChange: () => void;
  setNewOrder: React.Dispatch<React.SetStateAction<OrderPayload>>;
  onDeleteProduct: (productId: number) => void;
  hasOnlyOneProduct: boolean;
}

const ProductForm = ({
  index,
  product,
  onChange,
  setNewOrder,
  onDeleteProduct,
  hasOnlyOneProduct,
}: ProductFormProps) => {
  const quantityOptions = () => {
    const a: { id: string; label: string }[] = [];

    for (let i = 1; i <= 12; i++) {
      a.push({
        id: i.toString(),
        label: i.toString(),
      });
    }
    return a;
  };

  return (
    <div
      className="flex flex-col w-full items-center gap-5 p-6"
      key={`${index}-product`}
    >
      <div className="flex flex-row w-full gap-3 items-center justify-center">
        <StyledInput
          name="product-id"
          label="Código del producto"
          placeholder="Ej. HK98HGYT"
          value={product.id}
          className="w-full"
          onChange={(e) => {
            onChange();
            setNewOrder((previous) => {
              const updatedProducts = [...previous.products];
              updatedProducts[index] = {
                ...updatedProducts[index],
                id: e.target.value,
              };
              return { ...previous, products: updatedProducts };
            });
          }}
        />
        {!hasOnlyOneProduct && (
          <button
            className="flex hover:cursor-pointer mt-5"
            type="button"
            onClick={() => onDeleteProduct(index)}
          >
            <DeleteIcon width={28} heigth={28} />
          </button>
        )}
      </div>

      <StyledInput
        name="product-name"
        label="Nombre de producto"
        placeholder="Ingresa nombre del producto"
        value={product.name}
        className="w-full"
        onChange={(e) => {
          onChange();
          setNewOrder((previous) => {
            const updatedProducts = [...previous.products];
            updatedProducts[index] = {
              ...updatedProducts[index],
              name: e.target.value,
            };
            return { ...previous, products: updatedProducts };
          });
        }}
      />
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <StyledInputSelect
            label={"Cantidad"}
            name={"quantity"}
            value={product.quantity}
            placeholder={"Selecciona una cantidad"}
            className="w-full"
            onSelectOption={(e) => {
              console.log(e);
              onChange();
              setNewOrder((previous) => {
                const updatedProducts = [...previous.products];
                updatedProducts[index] = {
                  ...updatedProducts[index],
                  quantity: Number(e.id),
                };
                return { ...previous, products: updatedProducts };
              });
            }}
            items={quantityOptions()}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <StyledInput
            name="product-precio"
            label="Precio"
            placeholder="0"
            value={product.price === 0 ? "" : product.price}
            type="number"
            min={0}
            className="w-full"
            onChange={(e) => {
              onChange();
              setNewOrder((previous) => {
                const updatedProducts = [...previous.products];
                updatedProducts[index] = {
                  ...updatedProducts[index],
                  price: e.target.value === "" ? 0 : Number(e.target.value),
                };
                return { ...previous, products: updatedProducts };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
