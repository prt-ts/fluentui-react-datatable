import * as React from "react";
import { DefaultGridConfig, IDataGridProps } from "../types";
import { DEFAULT_PAGE_SIZE } from "../utils";
import { useDataTableGrid } from "./useDataTable";

export const useInitializeStore = ({ 
  columns = [],
  items = [], 
  pageSize = DEFAULT_PAGE_SIZE,
  ...rest
}: IDataGridProps) => {
  const {gridConfig$, items$, columns$, pageSize$ } = useDataTableGrid();

  React.useEffect(() => {
    columns$?.next(columns);
  }, [columns]);

  React.useEffect(() => {
    items$?.next(items);
  }, [items]);

  React.useEffect(() => {
    pageSize$?.next(pageSize);
  }, [pageSize]);


  // all config will initialize at the begining only
  React.useEffect(() => {
    gridConfig$?.next({
      tableSize: rest?.tableSize ?? DefaultGridConfig.tableSize,
      gridName: rest?.gridName,
      gridPrimaryField: rest?.gridPrimaryField,

      selectionMode: rest?.selectionMode ?? DefaultGridConfig.selectionMode,
      gridMode: rest?.gridMode ?? DefaultGridConfig.gridMode,
      isDefaultGroupCollapsed: rest?.isDefaultGroupCollapsed ?? DefaultGridConfig.isDefaultGroupCollapsed,
      hideColumnOnGroup: rest?.hideColumnOnGroup ?? DefaultGridConfig.hideColumnOnGroup,
    });
  }, []);

};