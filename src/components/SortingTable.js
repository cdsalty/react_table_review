import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import MOCK_DATA from "../MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./table.css";

// How to SORT using react-table

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns: columns,
    data: data
  },
  useSortBy); // useSortBy adds the sorting feature which will be used directly inside the jsx

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
          ))}
        </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SortingTable;

/*
Step 1: 
  - import "useSortBy" hook from react table
Step 2:
  - pass the useSortBy hook as the second arguement to the useTable hook.
    - this adds the sorting feature to the table instance
    - it can be used directly in the jsx
Step 3: 
  - inside the <th tag, pass in "column.getSortByToggleProps()" to add properties of the sorting feature to each individually column
  */
