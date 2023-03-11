import * as React from 'react'
import { useObservableState } from "observable-hooks";
import { BehaviorSubject, combineLatestWith, map, Observable } from "rxjs";
import { IColumn } from "../types";
import { useDataTableGrid } from "./useDataTable";
import { getPageSelectionOptions } from '../helpers';
import { DEFAULT_PAGE_SIZE } from '../utils';

export const usePagination = () => {
    const { filteredItems$, pageSize$, currentPage$ } = useDataTableGrid();
    const currentPage = useObservableState(currentPage$ as BehaviorSubject<number>, 1);
    const pageSize = useObservableState(pageSize$ as BehaviorSubject<number>, DEFAULT_PAGE_SIZE);
    const pageOptions$ = React.useMemo(() => pageSize$?.pipe(
        combineLatestWith(currentPage$ as BehaviorSubject<number>, filteredItems$ as Observable<readonly [any[], IColumn[]]>),
        map(([pSize, cPage, [filteredItems, columns]]) => {
            const totalNumberOfPages = filteredItems?.length > 0 ? Math.ceil(filteredItems.length / pSize) : 1;
            const pageOptions = getPageSelectionOptions(cPage, totalNumberOfPages);
            return [pageOptions, totalNumberOfPages] as const;
        })
    ), []);
    const [pageOptions, totalNumberOfPages] = useObservableState(pageOptions$ as Observable<readonly [number[], number]>, [[1], 1]);


    const handlePageChanges = (action: "first" | 'previous' | "next" | "last" | "current", pageNumber: number) => {
        let nextPage = pageNumber ?? 1;
        switch (action) {

            case 'previous':
                nextPage = pageNumber <= 1 ? 1 : pageNumber;
                break;

            case 'next':
                nextPage = pageNumber > totalNumberOfPages ? totalNumberOfPages : pageNumber;
                break;

            case 'first':
            case 'last':
            case 'current':
            default:
                nextPage = pageNumber;
                break;
        }

        currentPage$?.next(nextPage);
    }

    const handlePageSizeChange = (pageSize: number) => {
        pageSize$?.next(pageSize);
    }

    return {pageSize, currentPage, totalNumberOfPages, pageOptions, handlePageChanges, handlePageSizeChange } as const;
};