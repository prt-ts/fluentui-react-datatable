export interface IGridConfig  {
     /**
     * Unique Name of the Grid 
     * -- used for metadata handler
     */
     gridName : string;
     /**
      * Grid Primary Field
      * -- this must be unique value accross the dataset
      * -- it is used for the data selection, if two or more records have same value, 
      *    while selection, all rows will be selected
      * @default undefined
      */
     gridPrimaryField : string;

      /**
     * It used to layout the grid either in table view or gallery view
     * -- Must be either 'table' or 'gallery'
     * @default 'table'
     */ 
    gridMode? : "table" | "gallary" | undefined;

    /**
     * If you want to disable grid mode, set to true
     * @default undefined
     */
    disableGridMode? : boolean | undefined;

    /**
     * Selection Mode for the grid
     * @default 'multiple'
     */
    selectionMode? : "none" | "single" | "multiple"; 

    /**
     * If grouped, should default group collapsed
     * @default false
     */
    isDefaultGroupCollapsed? : boolean;

    /**
     * If grouped, Column will simply hidden in grid view
     * @default false
     */
    hideColumnOnGroup? : boolean;

 
    /**
     * disable export to excel feature
     * -- default false
     */
    disableExportToExcel? : boolean | undefined;

    /**
     * disable export to csv feature
     * -- default is false
     */
    disableExportToCSV? : boolean | undefined;

    /**
     * disable export to pdf 
     * -- default is false
     */
    disableExportToPDF? : boolean | undefined;

    /**
     * disable keyword search
     * -- default is false
     */
    disableKeywordSearch? : boolean | undefined;

    /**
     * disable grid column hide show action
     * -- default is false
     */
    disableGridColumnHideShow? : boolean | undefined;

    /**
     * Affects the sizes of all table subcomponents
     * @default medium
     */
    tableSize?: 'extra-small' | 'small' | 'medium';

} 


export const DefaultGridConfig : IGridConfig = {
    tableSize : "medium",
    gridName: "",
    gridPrimaryField: "id",

    gridMode : "table",
    selectionMode : "multiple",
    disableGridMode : false,

    isDefaultGroupCollapsed : false,
    hideColumnOnGroup : false
    
}