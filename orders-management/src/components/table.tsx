import type { Column } from "../types/table";

interface OrdersTableProps<T> {
  elements: T[];
  columns: Column<T>[];
}

const StyledTable = <T,>({ elements, columns }: OrdersTableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto min-w-[700px]">
      <table className="w-full text-text">
        <thead className="bg-secondary text-white">
          <tr className="border border-secondary border-solid">
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
            <tr key={rowIndex} className="border border-secondary border-solid">
              {columns.map((column) => {
                const value = row[column.key];

                return (
                  <td key={column.key.toString()} className="p-3 text-left">
                    {column.render
                      ? column.render(value, row)
                      : value
                        ? String(value)
                        : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StyledTable;
