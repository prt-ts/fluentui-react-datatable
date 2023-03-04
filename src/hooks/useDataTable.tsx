import { useContext } from "react";  
import { DataTableContext } from "../context";

export const useDataTableGrid = () => {
  return useContext(DataTableContext);
};