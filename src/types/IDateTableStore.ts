import { BehaviorSubject, Observable } from "rxjs";
import { IColumn } from "./IColumn";

export interface IDataTableStore {
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