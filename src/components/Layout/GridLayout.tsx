import * as React from "react";
import { Button, Checkbox, Subtitle2Stronger, Table, TableBody, TableHeader, TableHeaderCell, TableRow, useId } from "@fluentui/react-components";
import { useHeaderCellStyle, useHeaderRowStyle } from "../../styles";
import { IColumn, IDataGridProps, IGroup } from "../../types";
import { ArrowSortFilled, ArrowSortDownFilled, ArrowSortUpFilled } from "@fluentui/react-icons";
import { tryGetListValue, tryGetObjectValue } from "../../utils";
import { GlobalSearch } from "../GlobalSearch";
import { HeaderPopover } from "../HeaderPopover";
import { Pagination } from "../Pagination";
import { useDataTableGrid, useInitializeStore } from "../../hooks";
import { useObservableState } from "observable-hooks";
import { BehaviorSubject, Observable } from "rxjs";
import { DataTableGroupedPage, DataTablePage } from "../Table";

export const GridLayout: React.FunctionComponent<IDataGridProps> = (props) => {
    const { selectionMode, gridPrimaryField } = props;
    useInitializeStore(props);
    const { columns$, groups$, pagedItems$, selectedItems$ } = useDataTableGrid();
    const headerCellClasses = useHeaderCellStyle();
    const headerRowStyle = useHeaderRowStyle();
    const selectedValues = useObservableState(selectedItems$ as Observable<any[]>, [])

    const pagedItems = useObservableState(pagedItems$ as Observable<any[]>, []);
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);
    const groups = useObservableState(groups$ as BehaviorSubject<IGroup[]>, []);

    const handleSelectionChange = React.useCallback((value: any[], isSelected: boolean | "mixed" = true) => {
        console.log(value, isSelected);
        if (selectionMode === "single") {
            selectedItems$?.next([...value]);
        } else {
            const newSelectedItems = isSelected ? [...selectedValues, ...value] : [...selectedValues?.filter(s => !value?.includes(s))]
            selectedItems$?.next(newSelectedItems);
        }
    }, [selectionMode, selectedValues]);

    const handleSortColumn = React.useCallback((column: IColumn) => {
        const newColumn = columns?.map(col => {
            if (col.fieldName == column.fieldName) {
                col.isSorted = true,
                    col.isSortedDescending = !col.isSortedDescending;
            } else {
                col.isSorted = false;
                col.isSortedDescending = false;
            }

            return col;
        })
        columns$?.next(newColumn)
    }, [columns]);

    const isChecked = React.useMemo((): boolean | "mixed" => {
        const isAllSelected = [...pagedItems]
            ?.every((x) => selectedValues?.includes(tryGetObjectValue(gridPrimaryField, x)));

        if (!isAllSelected) {
            const isPartialSelected = [...pagedItems]
                ?.some((x) => selectedValues?.includes(tryGetObjectValue(gridPrimaryField, x)));

            return isPartialSelected ? "mixed" : false;
        }

        return true;
    }, [pagedItems, selectedValues, gridPrimaryField]);

    return (
        <div>
            <GlobalSearch />
            <Table arial-label={props.gridName} >
                <TableHeader>
                    <TableRow className={headerRowStyle.root}>
                        {(selectionMode !== "none") ?
                            <TableHeaderCell className={headerCellClasses.rowSelectCell}>
                                {selectionMode === "single" ?
                                    <></>
                                    : <Checkbox
                                        checked={isChecked}
                                        onChange={(_, data) => handleSelectionChange(tryGetListValue(gridPrimaryField, pagedItems) as any[], data.checked)} />}
                            </TableHeaderCell>
                            : <></>
                        }
                        {columns.map((column) => (
                            <TableHeaderCell key={column.fieldName} as="th" button={"div"}>
                                {column.disableAllActions ?
                                    <Subtitle2Stronger className={headerCellClasses.headerLable}>{column.headerLabel}</Subtitle2Stronger> :
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

                                        {<HeaderPopover column={column} />}
                                    </div>
                                }
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!groups?.length && <DataTablePage
                        pagedItems={[...pagedItems]}
                        columns={columns}
                    />}
                    {
                        groups.length > 0 &&
                        groups.map((group, index) => {
                            return (
                                <DataTableGroupedPage
                                    key={index + group.key}
                                    groupKey={index + group.key}
                                    group={group}
                                    columns={columns}
                                    pagedItems={pagedItems}
                                />
                            );
                        })
                    }
                </TableBody>
            </Table>
            <Pagination />
        </div>
    )
}