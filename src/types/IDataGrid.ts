import { IColumn } from "./IColumn";

export interface IDataGrid {
 
   
    /**
     * Data to be displayed in the grid
     * @default []
     */
    items? : any[] | never[];

    /**
     * column defination for the grid
     * -- Must be array of IColumn type
     * @default []
     */
    columns : IColumn[];

   
    /**
     * page size of the grid
     * @default 10
     */
    pageSize? : number;

} 
