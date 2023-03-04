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
    filteredItems$?: Observable<any[]>;
    sortedItems$?: Observable<any[]>;
    pagedItems$?: Observable<any[]>;
}