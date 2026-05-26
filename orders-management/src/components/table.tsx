import type { Column } from "../types/table";

interface OrdersTableProps<T> {
  elements: T[];
  columns: Column<T>[];
}

const StyledTable = <T,>({ elements, columns }: OrdersTableProps<T>) => {
  return (
    <table className="text-text">
      <thead className="border rounded-md bg-primary">
        <tr className="border-b-color-primary border-solid">
          {columns.map((column) => {
            return (
              <th key={column.key.toString()} className="p-3 text-left">
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {elements.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border border-color-primary border-solid"
          >
            {columns.map((column) => {
              const value = row[column.key];
              console.log(column, value);

              return (
                <td key={column.key.toString()} className="p-3 text-left">
                  {value ? String(value) : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StyledTable;
