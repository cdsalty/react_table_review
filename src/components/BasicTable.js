import { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./table.css";

const BasicTable = () => {
  // step 1
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  // step 2
  const tableInstance = useTable({
    columns: columns,
    data: data
  });

  /* step 4: use the tableInstance with JSX to render UI and destructure tableInstance
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    // step 3, create/design the table structure with HTML.

    <table {...getTableProps()}>
      <thead>
        {/* // step 5: implement the headergroups inside the HTML -> see notes below */}
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {/* I am getting an error that says "getHeaderGroupProps is not a function; will change later if problem arrises" */}
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {/* Step 6: create the rows for the td; will go inside the tbody tag */}
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                // row.cells gives access to the individually row cell
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
        {/* Step: 7: import inside app.js */}
      </tbody>
    </table>
  );
};

export default BasicTable;

/*
Need 3 things: The data, the columns component and the useTable hook provided by react-table
- use table takes in an object, columns and rows
- it recommended to memoized the rows and columns using useMemo hook; place it before the useTable call
  ----> this to prevent the data from being re-created on every render. If not, it will always think it's recieving more data and effect performance

Props from React-Table
** 
getTableProps: 
  - a function that needs to be destructured on the 'table' tag
    - <table {...getTableProps()}>
      </table>

getBodyProps: 
  - <tbody {...getBodyProps()}>


// STEP 5 detailed information
headerGroups: constains the column heading information; belongs insidel/underz` the <thead> tag
  - it is an array which requires the use of the map method to render the jsx of each header group.
  - <thead>
  // each header group will render the html <tr> and <td>
      {
        headerGroups.map(headerGroup) => {
          <tr {...headerGroup.getHeaderProps()}>
          {headerGroup.headers.map((column) => {
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          })}
          </tr>
        }
      }

  */
