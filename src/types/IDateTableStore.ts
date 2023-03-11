import { BehaviorSubject, Observable } from "rxjs";
import { IColumn } from "./IColumn";
import { IGridConfig } from "./IGridConfig";

export interface IDataTableStore {
    gridConfig$: BehaviorSubject<IGridConfig>;
    searchTerm$?: BehaviorSubject<string>;
    columns$?: BehaviorSubject<IColumn[]>; 
    groups$?: BehaviorSubject<any[]>;
    selectedItems$?: BehaviorSubject<any[]>;

    pageSize$?: BehaviorSubject<number>;
    currentPage$?: BehaviorSubject<number>;
        
    items$?: BehaviorSubject<any[]>;
    filteredItems$?: Observable<readonly [any[], IColumn[]]>;
    sortedItems$?: Observable<readonly [any[], IColumn[]]>;
    pagedItems$?: Observable<any[]>;
}