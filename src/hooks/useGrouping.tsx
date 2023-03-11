import * as React from 'react'
import { useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import { IColumn } from "../types";
import { useDataTableGrid } from "./useDataTable";

export const useGrouping = () => {
    const { columns$ } = useDataTableGrid();
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);

    const handleGroupColumn = React.useCallback((column: IColumn) => {
        const lastMaxGroupOrder = Math.max.apply(Math, [
            ...columns.map((col) => col.groupOrderNumber ?? 1),
          ]);

        const newColumn = columns.map(col => {
            if (column.fieldName == col.fieldName) {
                col.isGrouped = !col.isGrouped;
                col.groupOrderNumber = !col.isGrouped? lastMaxGroupOrder + 1 : 0;
            }
            return col;
        })

        columns$?.next(newColumn)

    }, [columns]);

    const handleResetAllGroups = React.useCallback(() => {
        const newColumn = columns.map(col => {
            col.isGrouped = false;
            col.groupOrderNumber = 0;
            return col;
        })

        columns$?.next(newColumn)

    }, [columns]);

    const hasColumnGrouped : boolean = React.useMemo(() => columns?.some(x => x.isGrouped), [columns]) 

    return {hasColumnGrouped, handleGroupColumn, handleResetAllGroups}
};