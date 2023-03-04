import * as React from "react";
import { IDataGridProps } from "../types";
import { DEFAULT_PAGE_SIZE } from "../utils";
import { useDataTableGrid } from "./useDataTable";

export const useInitializeStore = ({
  gridName,
  gridPrimaryField,
  columns = [],
  items = [],
  selectionMode = "multiple",

  gridMode = "table",
  disableGridMode = false,

  pageSize = DEFAULT_PAGE_SIZE

}: IDataGridProps) => {
  const { items$, columns$, pageSize$ } = useDataTableGrid();

  React.useEffect(() => {
    columns$?.next(columns);
  }, [columns]);

  React.useEffect(() => {
    items$?.next(items);
  }, [items]);

  React.useEffect(() => {
    pageSize$?.next(pageSize);
  }, [pageSize]);

};