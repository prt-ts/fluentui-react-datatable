import * as React from "react";
import { Button, Checkbox, Radio, Subtitle2Stronger, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, useId } from "@fluentui/react-components";
import { useHeaderCellStyle, useHeaderRowStyle } from "../../styles";
import { IColumn, IDataGridProps } from "../../types";
import { ArrowSortFilled, ArrowSortDownFilled, ArrowSortUpFilled } from "@fluentui/react-icons";
import { tryGetListValue, tryGetObjectValue } from "../../utils";
import { GlobalSearch } from "../GlobalSearch";
import { HeaderPopover } from "../HeaderPopover";
import { Pagination } from "../Pagination";
import { useDataTableGrid, useInitializeStore } from "../../hooks";
import { useObservableState } from "observable-hooks";
import { BehaviorSubject, Observable } from "rxjs";

export const GridLayout : React.FunctionComponent<IDataGridProps> = (props) => {
    useInitializeStore(props);
    const { columns$, pagedItems$ } = useDataTableGrid();
    const headerCellClasses = useHeaderCellStyle();
    const headerRowStyle = useHeaderRowStyle();
    const radioName = useId("radio");

    const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

    const pagedItems = useObservableState(pagedItems$ as Observable<any[]>, []);
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);

    const handleSelectionChange = React.useCallback((value: any[], isSelected: boolean | "mixed" = true) => {
        console.log(value, isSelected);
        if (props.selectionMode === "single") {
            setSelectedValues([...value]);
        } else {
            setSelectedValues(sValue => {
                if (isSelected) {
                    return [...sValue, ...value]
                }

                return [...sValue?.filter(s => !value?.includes(s))]

            });
        }

    }, [props.selectionMode, selectedValues]);

    const handleSortColumn = React.useCallback((column : IColumn) => {
        const newColumn = columns?.map(col => {
            if(col.fieldName == column.fieldName){
                col.isSorted = true,
                col.isSortedDescending = !col.isSortedDescending;
            }else{
                col.isSorted = false;
                col.isSortedDescending= false;
            }

            return col;
        })
        columns$?.next(newColumn)
    }, [columns]);

    return (
        <div>
            <GlobalSearch />
            <Table arial-label={props.gridName} >
                <TableHeader>
                    <TableRow className={headerRowStyle.root}>
                        {(props.selectionMode !== "none") ?
                            <TableHeaderCell className={headerCellClasses.rowSelectCell}>
                                {props.selectionMode === "single" ?
                                    <></>
                                    : <Checkbox
                                        onChange={(_, data) => handleSelectionChange(tryGetListValue(props.gridPrimaryField, props.items) as any[], data.checked)} />}
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
                                        icon={!column?.isSorted ? <ArrowSortFilled /> : (column.isSortedDescending ? <ArrowSortDownFilled /> : <ArrowSortUpFilled />)}
                                        onClick={() => handleSortColumn(column)}
                                        >
                                        <Subtitle2Stronger className={headerCellClasses.headerLable}>{column.headerLabel}</Subtitle2Stronger>
                                    </Button>

                                    <HeaderPopover column={column} />
                                </div>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pagedItems?.map((item: any, index: number) => (
                        <TableRow key={index}>
                            {(props.selectionMode !== "none") ?
                                <TableCell as="td">
                                    {props.selectionMode === "single" ?
                                        <Radio
                                            name={radioName}
                                            value={tryGetObjectValue(props.gridPrimaryField, item)} 
                                            onChange={(_, data) => handleSelectionChange([data.value])}
                                        />
                                        : <Checkbox
                                            checked={selectedValues?.includes(tryGetObjectValue(props.gridPrimaryField, item))}
                                            onChange={(_, data) => handleSelectionChange([tryGetObjectValue(props.gridPrimaryField, item)], data.checked)} />}
                                </TableCell>
                                : <></>
                            }
                            {columns.map((column, index) => (
                                <TableCell key={column.fieldName + "_" + index}>
                                    <TableCellLayout media={column.mediaFieldName ? tryGetObjectValue(column.mediaFieldName, item) : undefined}>
                                        {tryGetObjectValue(column.fieldName, item)}
                                    </TableCellLayout>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination />
        </div>
    )
}