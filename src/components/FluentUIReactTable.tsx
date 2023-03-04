import * as React from "react";
import { Button, Checkbox, FluentProvider, Radio, Subtitle2Stronger, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, teamsLightTheme, useId } from '@fluentui/react-components';
import { IDataGridProps } from "../types/IDataGridProps";
import { tryGetListValue, tryGetObjectValue } from "../utils"
import { ArrowSortDownFilled, ArrowSortFilled, ArrowSortUpFilled } from "@fluentui/react-icons";
import { useHeaderCellStyle, useHeaderRowStyle } from "../styles";
import { HeaderPopover } from "./HeaderPopover";
import { Pagination } from "./Pagination";
import { GlobalSearch } from "./GlobalSearch";

export const FluentUIReactTable: React.FunctionComponent<IDataGridProps> = (props) => {
    return (
        <div>
            <FluentProvider theme={teamsLightTheme}>
                <FluentUIReactTableContainer {...props} />
            </FluentProvider>
        </div>
    )
}

const FluentUIReactTableContainer: React.FunctionComponent<IDataGridProps> = ({
    gridName, gridPrimaryField, columns, items, selectionMode
}) => {
    const headerCellClasses = useHeaderCellStyle();
    const headerRowStyle = useHeaderRowStyle();
    const radioName = useId("radio");

    const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

    const handleSelectionChange = React.useCallback((value: any[], isSelected: boolean | "mixed" = true) => {
        console.log(value, isSelected);
        if (selectionMode === "single") {
            setSelectedValues([...value]);
        } else {
            setSelectedValues(sValue => {
                if (isSelected) {
                    return [...sValue, ...value]
                }

                return [...sValue?.filter(s => !value?.includes(s))]

            });
        }

    }, [selectionMode, selectedValues]);

    return (
        <div>
            <GlobalSearch onSearchInputChange={(searchTerm) => console.log(searchTerm)}/>
            <Table arial-label={gridName} >
                <TableHeader>
                    <TableRow className={headerRowStyle.root}>
                        {(selectionMode !== "none") ?
                            <TableHeaderCell className={headerCellClasses.rowSelectCell}>
                                {selectionMode === "single" ?
                                    <></>
                                    : <Checkbox
                                        onChange={(_, data) => handleSelectionChange(tryGetListValue(gridPrimaryField, items) as any[], data.checked)} />}
                            </TableHeaderCell>
                            : <></>
                        }
                        {columns.map((column) => (
                            <TableHeaderCell key={column.fieldName} as="th" button={"div"}>
                                <div className={headerCellClasses.root}>

                                    <Button
                                        aria-label="Sort Column"
                                        size='medium'
                                        appearance="transparent"
                                        icon={!column?.isSorted ? <ArrowSortFilled /> : (column.isSortedDescending ? <ArrowSortDownFilled /> : <ArrowSortUpFilled />)}>
                                        <Subtitle2Stronger className={headerCellClasses.headerLable}>{column.headerLabel}</Subtitle2Stronger>
                                    </Button>

                                    <HeaderPopover column={column}/>
                                </div>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((item: any, index: number) => (
                        <TableRow key={index}>
                            {(selectionMode !== "none") ?
                                <TableCell>
                                    {selectionMode === "single" ?
                                        <Radio
                                            name={radioName}
                                            value={tryGetObjectValue(gridPrimaryField, item)}
                                            onChange={(_, data) => handleSelectionChange([data.value])}
                                        />
                                        : <Checkbox
                                            checked={selectedValues?.includes(tryGetObjectValue(gridPrimaryField, item))}
                                            onChange={(_, data) => handleSelectionChange([tryGetObjectValue(gridPrimaryField, item)], data.checked)} />}
                                </TableCell>
                                : <></>
                            }
                            {columns.map((column, index) => (
                                <TableCell key={column.fieldName + "_" + index}>
                                    <TableCellLayout media={ column.mediaFieldName ? tryGetObjectValue(column.mediaFieldName, item) : undefined}>
                                        {tryGetObjectValue(column.fieldName, item)}
                                    </TableCellLayout>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination totalNumberOfPages={10} currentPage={2} onPageChange={(cPage) => console.log(cPage)}/>
        </div>
    )
}

