import * as React from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";
import { filterGrid, groupItems, sortGrid } from "../helpers";
import { DefaultGridConfig, IColumn, IGridConfig, IGroup } from "../types";
import { DEFAULT_PAGE_SIZE } from "../utils";

export const useTableStore = () => {

     /**
     * Store to hold global search term
     * @default {}
     */
     const gridConfig$ = React.useMemo(() => new BehaviorSubject<IGridConfig>({...DefaultGridConfig}), []);

    /**
     * Store to hold global search term
     * @default ""
     */
    const searchTerm$ = React.useMemo(() => new BehaviorSubject<string>(""), []);

    /**
     * Store to hold Columns Information
     * @default []
     */
    const columns$ = React.useMemo(() => new BehaviorSubject<IColumn[]>([]), []);

    /**
     * Store to hold the group information
     * @default []
     */
    const groups$ = React.useMemo(() => new BehaviorSubject<IGroup[]>([]), []);

    /**
     * Store to hold the selected items key values
     * @default []
     */
    const selectedItems$ = React.useMemo(() => new BehaviorSubject<any[]>([]), []);

    /**
     * Store to hold the page Size
     * @default 10
     */
    const pageSize$ = React.useMemo(() => new BehaviorSubject<number>(10), []);

    /**
     * Store to hold the page Size
     * @default 1
     */
    const currentPage$ = React.useMemo(() => new BehaviorSubject<number>(1), []);

    /**
     * Store to hold the items of the grid
     * @default []
     */
    const items$ = React.useMemo(() => new BehaviorSubject<any[]>([]), []);

    /**
     * Store to hold the filtered items
     * @default [] (Calculated Value based on items and filter expression)
     */
    const filteredItems$ = React.useMemo(() => items$.pipe(
        combineLatestWith(columns$, searchTerm$),
        map(([items, columns, searchTerm]) => [filterGrid([...items], searchTerm, columns), columns] as const)
    ), []);

    /**
     * Store to hold the sorted items
     * @default [] (Calculated Value based on filtered items and current sort column)
     */
    const sortedItems$ = React.useMemo(() => filteredItems$.pipe(
        map(([filteredItems, columns]) => [sortGrid([...filteredItems], columns), columns] as const)
    ), []);

    /**
     * Store to hold the paged items
     * @default [] (Calculated Value based on sorted items, current page and page size)
     */
    const pagedItems$ = React.useMemo(() => sortedItems$.pipe(
        combineLatestWith(pageSize$, currentPage$),
        map(([[sortedItems, columns], pSize, cPage]) => {
            const calculatedPageSize : number = pSize ?? DEFAULT_PAGE_SIZE;
            const firstIndex : number = (cPage - 1) * pSize;
            const lastIndex =
                calculatedPageSize > sortedItems?.length
                    ? sortedItems.length
                    : calculatedPageSize;
            return [[...sortedItems]?.splice(firstIndex, lastIndex), columns] as const;
        }),
        map(([pagedItems, columns]) => {
            // get grouped column
            const groupedColumns = columns
                ?.filter((x) => x.isGrouped)
                ?.sort((x, y) => (x.groupOrderNumber && y.groupOrderNumber && x.groupOrderNumber > y.groupOrderNumber) ? 1 : -1
                );

            const groups = groupItems(
                [...pagedItems],
                [...groupedColumns],
                true,
                undefined,
                [...groups$.value]
            );

            console.log(groups, groups$.value)
            groups$.next(groups);
            return pagedItems;
        }),
    ), []);

    return {
        gridConfig$,
        searchTerm$,
        columns$,
        groups$,
        selectedItems$,

        pageSize$,
        currentPage$,

        items$,
        filteredItems$,
        sortedItems$,
        pagedItems$
    } as const;
}