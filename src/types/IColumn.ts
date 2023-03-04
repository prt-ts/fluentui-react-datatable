import { LogicalExpression } from "@prt-ts/filter-expreression-eval";

export interface IColumn {
    /**
     * propery of the object in the data list
     * -- must be provided
     * -- no default value
     */
    fieldName: string;

    /**
     * table header text
     */
    headerLabel: string;

     /**
     * any media icon for column
     */
    mediaFieldName?: string;

    /**
     * data type of the field in object
     * -- default is text
     */
    columnDataType? : "text" | "html" | "number" | "date" | "people" | "badge" | undefined;

    /**
     * disable all actions on this column
     * -- disable sort
     * -- disable filter
     * -- disable grouping
     */
    disableAllActions?: boolean | undefined;

    /**
     * disable sort action on this column
     * -- default is false
     */
    disableSort?: boolean | undefined;

    /**
     * disable filter action on this column
     * -- default is false
     */
    disableFilter?: boolean | undefined;

    /**
     * disable grouping action on this column
     * -- default is false
     */
    disableGrouping?: boolean | undefined;

    /**
     * set true if default grid needs to be sorted based on this column
     * -- sort only applicable to one column
     * -- if you have provided isSorted true to muliple column, first column will overide others
     */
    isSorted?: boolean | undefined;

    /**
     * set true if data already sorted descending
     */
    isSortedDescending?: boolean | undefined;

    /**
     * display unsorted icon in every column
     * -- default is true
     */
    showUnsortedIcon?: boolean | undefined;

    /**
     * set true if default grid needs to be group on this colum
     */
    isGrouped?: boolean | undefined;

    /**
     * set order in which you want to group you grid
     * -- only applicable if group by multiple column
     * -- default is 1
     */
    groupOrderNumber?: number | undefined;

    /**
     * set true if default filter expression is provided
     */
    isFiltered?: boolean | undefined;

    /**
     * default filter expression for the grid 
     */
    filterExpression? : LogicalExpression | undefined;

    /**
     * allow column resize
     * -- default is true
     */
    isResizable? : boolean | undefined;

    /**
     * if true, hides this column in default view
     */
    hideColumnInDefaultView? : boolean | undefined;

    /**
     * regardless of value of hideColumnInDefaultView
     * -- column will be visible in grid
     * -- column can not be hidden
     */
    disableColumnHideShow? : boolean | undefined;
     
} 