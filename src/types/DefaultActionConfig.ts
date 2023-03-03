interface IDefaultActionConfig {
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

export { IDefaultActionConfig }