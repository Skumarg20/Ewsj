import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface TableProps {
  caption?: string;
  headers: string[];
  data: { [key: string]: string }[];
  handleonChange(finaldata: any): void;
}

export default function TimeTables({
  caption,
  headers,
  data,
  handleonChange,
}: TableProps) {
  // const [tableHeaders, setTableHeaders] = useState<string[]>(headers);
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>(data);

  handleonChange(tableData);
  console.log(tableData, "this is table data in table");
  // console.log(tableHeaders, tableData);

  // const handleHeaderEdit = (index: number, event: React.FocusEvent<HTMLTableCellElement>) => {
  //   const updatedHeaders = [...tableHeaders];
  //   updatedHeaders[index] = event.target.innerText;
  //   setTableHeaders(updatedHeaders);
  // };

  const handleCellEdit = (
    rowIndex: number,
    columnKey: string,
    event: React.FocusEvent<HTMLTableCellElement>
  ) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnKey]: event.target.innerText,
    };
    setTableData(updatedData);
  };

  // const addColumn = () => {
  //   const newHeader = `Column ${tableHeaders.length + 1}`;
  //   setTableHeaders((prevHeaders) => [...prevHeaders, newHeader]);

  //   const updatedData = tableData.map((row) => ({
  //     ...row,
  //     [newHeader]: "",
  //   }));

  //   setTableData(updatedData);
  // };
  const addRow = () => {
    const newRow: { [key: string]: string } = {};
    headers.forEach((header) => (newRow[header] = ""));
    setTableData((prevData) => [...prevData, newRow]);
  };
  const removeRow = (rowIndex: number) => {
    const updatedData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedData);
  };

  return (
    <div className="w-full rounded-3xl flex-col bg-white p-4 shadow-lg cursor-pointer justify-center items-center">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 rounded-xl">
        <Table className="min-w-full">
          {caption && (
            <TableCaption className="bg-gray-800 text-slate-100 rounded-md m-3 p-2">
              {caption}
            </TableCaption>
          )}

          {/* Editable Table Headers */}
          <TableHeader className="bg-gray-200">
            <TableRow className="border-b-2 border-gray-900">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="text-center px-4 py-2 border-gray-900 outline-none focus:ring-1 focus:ring-gray-500 focus:rounded-2xl"
                >
                  {header.toUpperCase()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Editable Table Cells */}
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-gray-900 hover:bg-gray-100"
                >
                  {headers.map((header, colIndex) => (
                    <TableCell
                      key={colIndex}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(event) =>
                        handleCellEdit(rowIndex, header, event)
                      }
                      className="text-center px-4 py-2 whitespace-nowrap border-gray-900 outline-none rounded-lg focus:ring-1 focus:ring-gray-500 focus:rounded-2xl"
                    >
                      {row[header] || ""}
                    </TableCell>
                  ))}

                  <TableCell className="text-center px-4 py-2">
                    <Button
                      onClick={() => removeRow(rowIndex)}
                      className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded-lg"
                    >
                      <Trash size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="text-center px-4 py-2"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Button
        onClick={addRow}
        className="bg-blue-600 w-full p-3 text-white px-4 mt-3 rounded-3xl hover:text-gray-800 hover:bg-white"
      >
        Add Row
      </Button>
    </div>
  );
}
