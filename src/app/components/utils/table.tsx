'use client';
import React  from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaEdit, FaRegClock, FaTable } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  caption?: string;
  headers: string[];
  data: { [key: string]: string }[];
  
}

export default function TimeTables({
  caption,
  headers,
  data,
  
}: TableProps) {
  function handleCheckboxChange()  {
    throw new Error("Function not implemented.");
  }

  // const [tableHeaders, setTableHeaders] = useState<string[]>(headers);
  // const [tableData, setTableData] = useState<{ [key: string]: string }[]>(data);

  // handleonChange(tableData);
  // console.log(tableData, "this is table data in table");
  // // console.log(tableHeaders, tableData);

  // // const handleHeaderEdit = (index: number, event: React.FocusEvent<HTMLTableCellElement>) => {
  // //   const updatedHeaders = [...tableHeaders];
  // //   updatedHeaders[index] = event.target.innerText;
  // //   setTableHeaders(updatedHeaders);
  // // };
   
  // const handleCellEdit = (
  //   rowIndex: number,
  //   columnKey: string,
  //   event: React.FocusEvent<HTMLTableCellElement>
  // ) => {
  //   const updatedData = [...tableData];
  //   updatedData[rowIndex] = {
  //     ...updatedData[rowIndex],
  //     [columnKey]: event.target.innerText,
  //   };
  //   setTableData(updatedData);
  // };

  // const addColumn = () => {
  //   const newHeader = `Column ${tableHeaders.length + 1}`;
  //   setTableHeaders((prevHeaders) => [...prevHeaders, newHeader]);

  //   const updatedData = tableData.map((row) => ({
  //     ...row,
  //     [newHeader]: "",
  //   }));

  //   setTableData(updatedData);
  // };
  // const addRow = () => {
  //   const newRow: { [key: string]: string } = {};
  //   headers.forEach((header) => (newRow[header] = ""));
  //   setTableData((prevData) => [...prevData, newRow]);
  // };
  // const removeRow = (rowIndex: number) => {
  //   const updatedData = tableData.filter((_, index) => index !== rowIndex);
  //   setTableData(updatedData);
  // };

  return (
    <div className="w-full rounded-3xl flex-col bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-2xl cursor-pointer relative overflow-hidden">
    {/* Floating Background Graphics */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-30"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  
    {/* Table Container */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 rounded-xl w-full border border-gray-200 bg-white/90 backdrop-blur-sm"
    >
      <Table className="min-w-full">
      {caption && (
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className="w-full flex-grow"
  >
    <TableCaption className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mx-2 my-1 p-3 flex items-center gap-2 w-full">
      <FaTable className="w-5 h-5" />
      {caption}
    </TableCaption>
  </motion.div>
)}
  
        {/* Animated Table Header */}
        <TableHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
          <TableRow className="border-b-2 border-blue-200 group">
            {headers.map((header, index) => (
              <motion.th
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 text-blue-900 font-bold text-sm uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 justify-center hover:translate-y-[-2px] transition-transform">
                  {header === "completed" ? (
                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                  ) : header === "time" ? (
                    <FaRegClock className="w-4 h-4 text-purple-500" />
                  ) : (
                    <FaEdit className="w-4 h-4 text-blue-500" />
                  )}
                  {header}
                </div>
              </motion.th>
            ))}
          </TableRow>
        </TableHeader>
  
        {/* Animated Table Body */}
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-b border-blue-50 hover:bg-blue-50/50 transition-colors"
              >
                {headers.map((header, colIndex) => (
                  <motion.td
                    key={colIndex}
                    whileHover={{ scale: 1.02 }}
                    className="px-6 py-4 text-center text-gray-700 font-medium relative group"
                  >
                    {header === "completed" ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex justify-center"
                      >
                        <div className="relative w-6 h-6">
                          <input
                            type="checkbox"
                            checked={!!row[header]}
                            onChange={() => handleCheckboxChange()}
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="w-full h-full rounded-md bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {row[header] && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-blue-500"
                              >
                                <FaCheckCircle className="w-5 h-5" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <span className="relative">
                        {row[header] || "-"}
                        <div className="absolute inset-0 border-b-2 border-transparent group-hover:border-blue-200 transition-all" />
                      </span>
                    )}
                  </motion.td>
                ))}
              </motion.tr>
            ))
          ) : (
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <td
                colSpan={headers.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                <div className="flex flex-col items-center gap-3">
                  <FaTable className="w-12 h-12 text-gray-300" />
                  No data available
                </div>
              </td>
            </motion.tr>
          )}
        </TableBody>
      </Table>
    </motion.div>
  </div>
  );
}
