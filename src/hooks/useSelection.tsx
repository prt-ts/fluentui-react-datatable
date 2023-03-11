import * as React from 'react'
import { useObservableState } from "observable-hooks";
import { BehaviorSubject, Observable } from "rxjs";
import { DefaultGridConfig, IGridConfig, IGroup } from "../types";
import { useDataTableGrid } from "./useDataTable";
import { tryGetObjectValue } from '../utils';

export const useSelection = () => {
    const { gridConfig$, selectedItems$, pagedItems$ } = useDataTableGrid();
    const selectedValues = useObservableState(selectedItems$ as BehaviorSubject<any[]>, []); 
    const gridConfig = useObservableState<IGridConfig>(gridConfig$, DefaultGridConfig);
    const pagedItems = useObservableState(pagedItems$ as Observable<any[]>, []);

    const handleSelectionChange = React.useCallback((value: any[], isSelected: boolean | "mixed" = true) => {
        console.log(value, isSelected);
        if (gridConfig.selectionMode === "single") {
            selectedItems$?.next([...value]);
        } else {
            const newSelectedItems = isSelected ? [...selectedValues, ...value] : [...selectedValues?.filter(s => !value?.includes(s))]
            selectedItems$?.next(newSelectedItems);
        }
    }, [gridConfig, selectedValues]);

    const verifySelected = React.useCallback((item: any) => {
        return selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, item))
    }, [gridConfig, selectedValues]);

   const isAllPagedItemsSelected = React.useMemo((): boolean | "mixed" => {
        const isAllSelected = [...pagedItems]
            ?.every((x) => selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, x)));

        if (!isAllSelected) {
            const isPartialSelected = [...pagedItems]
                ?.some((x) => selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, x)));

            return isPartialSelected ? "mixed" : false;
        }

        return true;
    }, [pagedItems, selectedValues, gridConfig]);
 
    return {isAllPagedItemsSelected, verifySelected,  handleSelectionChange }
};