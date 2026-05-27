import type { Column } from "../types/table";

interface OrdersTableProps<T> {
  elements: T[];
  columns: Column<T>[];
  onSelectRow?: (id: string) => void;
}

const StyledTable = <T extends { id: string }>({
  elements,
  columns,
  onSelectRow,
}: OrdersTableProps<T>) => {
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
            <tr
              key={rowIndex}
              className={`border border-secondary border-solid ${onSelectRow ? "hover:cursor-pointer hover:bg-primary-light" : ""}`}
            >
              {columns.map((column) => {
                const value = row[column.key];

                return (
                  <td
                    key={column.key.toString()}
                    onClick={() => onSelectRow?.(row.id)}
                    className={`p-3 text-left`}
                  >
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
