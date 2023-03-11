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


  React.useEffect(() => {
    gridConfig$?.next({       
      gridName : rest?.gridName,
      gridPrimaryField : rest?.gridPrimaryField,
      
      selectionMode : rest?.selectionMode ?? DefaultGridConfig.selectionMode,
      gridMode : rest?.gridMode ?? DefaultGridConfig.gridMode, 
      isDefaultGroupCollapsed : rest?.isDefaultGroupCollapsed ?? DefaultGridConfig.isDefaultGroupCollapsed, 
    });
  }, [rest]);

};