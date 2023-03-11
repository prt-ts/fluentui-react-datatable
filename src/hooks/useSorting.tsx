import * as React from 'react'
import { useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import { IColumn } from "../types";
import { useDataTableGrid } from "./useDataTable";

export const useSorting = () => {
    const { columns$ } = useDataTableGrid();
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);
    
    const handleSortColumn = React.useCallback((column: IColumn) => {
        const newColumn = columns?.map(col => {
            if (col.fieldName == column.fieldName) {
                col.isSorted = true,
                    col.isSortedDescending = !col.isSortedDescending;
            } else {
                col.isSorted = false;
                col.isSortedDescending = false;
            }

            return col;
        })
        columns$?.next(newColumn)
    }, [columns]);
 
    return { handleSortColumn }
};