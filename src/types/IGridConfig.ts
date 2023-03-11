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

} 


export const DefaultGridConfig : IGridConfig = {
    gridName: "",
    gridPrimaryField: "id"
}