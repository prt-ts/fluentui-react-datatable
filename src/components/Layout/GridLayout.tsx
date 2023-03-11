import * as React from "react";
import { Button, Checkbox, Subtitle2Stronger, Table, TableBody, TableHeader, TableHeaderCell, TableRow, useId } from "@fluentui/react-components";
import { useHeaderCellStyle, useHeaderRowStyle } from "../../styles";
import { DefaultGridConfig, IColumn, IDataGridProps, IGridConfig, IGroup } from "../../types";
import { ArrowSortFilled, ArrowSortDownFilled, ArrowSortUpFilled } from "@fluentui/react-icons";
import { tryGetListValue } from "../../utils";
import { GlobalSearch } from "../GlobalSearch";
import { HeaderPopover } from "../HeaderPopover";
import { Pagination } from "../Pagination";
import { useDataTableGrid, useInitializeStore, useSelection, useSorting } from "../../hooks";
import { useObservableState } from "observable-hooks";
import { BehaviorSubject, Observable } from "rxjs";
import { DataTableGroupedPage, DataTablePage } from "../Table"; 

export const GridLayout: React.FunctionComponent<IDataGridProps> = (props) => {
    const { selectionMode, gridPrimaryField } = props;
    useInitializeStore(props);
    const { gridConfig$, columns$, groups$, pagedItems$ } = useDataTableGrid();
    const { isAllPagedItemsSelected, handleSelectionChange } = useSelection();
    const { handleSortColumn } = useSorting()
    const headerCellClasses = useHeaderCellStyle();
    const headerRowStyle = useHeaderRowStyle();
    
    const pagedItems = useObservableState(pagedItems$ as Observable<any[]>, []);
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);
    const groups = useObservableState(groups$ as BehaviorSubject<IGroup[]>, []);
    const gridConfig = useObservableState<IGridConfig>(gridConfig$, DefaultGridConfig);


 
    const visibleColumns : IColumn[] = React.useMemo(() => {
        return columns?.filter(col => (!col.hideColumnInDefaultView) &&
            (
                !gridConfig.hideColumnOnGroup
                || (gridConfig.hideColumnOnGroup && !col.isGrouped)
            )
        );
    }, [columns])

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
                                        checked={isAllPagedItemsSelected}
                                        onChange={(_, data) => handleSelectionChange(tryGetListValue(gridPrimaryField, pagedItems) as any[], data.checked)} />}
                            </TableHeaderCell>
                            : <></>
                        }
                        {(visibleColumns || columns)?.map((column) => (
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
                        columns={(visibleColumns || columns)}
                    />}
                    {
                        groups.length > 0 &&
                        groups.map((group, index) => {
                            return (
                                <DataTableGroupedPage
                                    key={index + group.key}
                                    groupKey={index + group.key}
                                    group={group}
                                    columns={(visibleColumns || columns)}
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