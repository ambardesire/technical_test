import type { Column } from "../types/table";

interface OrdersTableProps<T> {
  elements: T[];
  columns: Column<T>[];
  onSelectRow?: (id: string) => void;
  noData: string;
}

const StyledTable = <T extends { id: string }>({
  elements,
  columns,
  onSelectRow,
  noData,
}: OrdersTableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[700px] w-full text-text">
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
          {Boolean(elements.length) &&
            elements.map((row, rowIndex) => (
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
      {Boolean(!elements.length) && (
        <p className="text-center font-bold p-3">{noData}</p>
      )}
    </div>
  );
};

export default StyledTable;
