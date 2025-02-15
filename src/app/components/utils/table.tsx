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

interface TableProps {
  caption?: string;
  headers: string[];
  data: { [key: string]: string }[];
}

export default function TimeTables({ caption, headers, data }: TableProps) {
  const [tableHeaders, setTableHeaders] = useState<string[]>(headers);
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>(data);

 
  const handleHeaderEdit = (index: number, event: React.FocusEvent<HTMLTableCellElement>) => {
    const updatedHeaders = [...tableHeaders];
    updatedHeaders[index] = event.target.innerText;
    setTableHeaders(updatedHeaders);
  };

 
  const handleCellEdit = (rowIndex: number, columnKey: string, event: React.FocusEvent<HTMLTableCellElement>) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [columnKey]: event.target.innerText };
    setTableData(updatedData);
  };

 
  const addColumn = () => {
    const newHeader = `Column ${tableHeaders.length + 1}`;
    setTableHeaders((prevHeaders) => [...prevHeaders, newHeader]);

    const updatedData = tableData.map((row) => ({
      ...row,
      [newHeader]: "", 
    }));

    setTableData(updatedData);
  };

  return (
    <div className="w-full rounded-3xl bg-white p-4 shadow-lg cursor-pointer">
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
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(event) => handleHeaderEdit(index, event)}
                  className="text-center px-4 py-2  border-gray-900 outline-none focus:ring-1 focus:ring-gray-500 focus:rounded-2xl "
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Editable Table Cells */}
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-b border-gray-900 hover:bg-gray-100">
                  {tableHeaders.map((header, colIndex) => (
                    <TableCell
                      key={colIndex}
                      contentEditable
                      suppressContentEditableWarning
                    className="text-center px-4 py-2 whitespace-nowrap border-gray-900 outline-none rounded-lg focus:ring-1 focus:ring-gray-500 focus:rounded-2xl"
                    >
                      {row[header] || ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} className="text-center px-4 py-2">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Add Column Button (Now Works!) */}
      <Button onClick={addColumn} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Add Column
      </Button>
    </div>
  );
}
