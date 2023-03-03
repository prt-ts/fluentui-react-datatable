import { IDefaultActionConfig } from "./DefaultActionConfig";
import { IColumn } from "./IColumn";

interface IDataGridProps {
 
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
     */
    gridPrimaryField : string;

    /**
     * Data to be displayed in the grid
     */
    items? : any[] | never[];

    /**
     * column defination for the grid
     * -- Must be array of IColumn type
     */
    columns : IColumn[];

    /**
     * It used to layout the grid either in table view or gallery view
     * -- Must be either 'table' or 'gallery'
     * -- default value is 'table'
     */ 
    gridMode? : "table" | "gallary" | undefined;

    /**
     * If you want to disable grid mode, set to true
     * -- default is undefined
     */
    disableGridMode? : boolean | undefined;

    /**
     * Selection Mode for the grid
     * -- default is 'multiple'
     */
    selectionMode? : "none" | "single" | "multiple";

    /**
     * action config
     * -- see IDefaultActionConfig for details
     */
    actionConfig? : IDefaultActionConfig | undefined;

}

export { IDataGridProps }