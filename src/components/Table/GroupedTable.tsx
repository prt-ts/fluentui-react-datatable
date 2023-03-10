import { Body1Stronger, Button, Checkbox, Radio, TableCell, TableCellActions, TableCellLayout, TableRow, useId } from '@fluentui/react-components'
import { ChevronCircleDownRegular, ChevronCircleUpRegular } from '@fluentui/react-icons'
import { useObservableState } from 'observable-hooks'
import * as React from 'react'
import { BehaviorSubject } from 'rxjs'
import { useDataTableGrid, useSelection } from '../../hooks'
import { DefaultGridConfig, IColumn, IGridConfig, IGroup } from '../../types'
import { tryGetListValue, tryGetObjectValue } from '../../utils'

export const DataTableGroupedPage: React.FunctionComponent<{
    groupKey: string,
    group: IGroup,
    columns: IColumn[]
    pagedItems: any[]
}> = ({ groupKey, group, columns, pagedItems }) => {
    const radioName = useId("radio");
    const { gridConfig$, selectedItems$, groups$ } = useDataTableGrid();
    const { handleSelectionChange } = useSelection();
    const selectedValues = useObservableState(selectedItems$ as BehaviorSubject<any[]>, []);
    const groups = useObservableState(groups$ as BehaviorSubject<IGroup[]>, []);
    const gridConfig = useObservableState<IGridConfig>(gridConfig$, DefaultGridConfig);

    const groupPadding = 15 * (group?.level ?? 0);

    const isChecked = React.useMemo((): boolean | "mixed" => {
        const isAllSelected = [...pagedItems]?.splice(group.startIndex, group.count)
            ?.every((x) => selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, x)));

        if (!isAllSelected) {
            const isPartialSelected = [...pagedItems]
                ?.splice(group.startIndex, group.count)
                ?.some((x) => selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, x)));

            return isPartialSelected ? "mixed" : false;
        }

        return true;
    }, [pagedItems, selectedValues, gridConfig.gridPrimaryField, group]);

    const collapseExpandGroup = (checkGroups: IGroup[], current: IGroup): IGroup[] => {

        const newGroup = checkGroups?.map((group) => {
            if (current?.key == group?.key) {
                return {
                    ...group,
                    isCollapsed: !group.isCollapsed,
                };
            }

            if (!group?.isCollapsed && group?.children?.length) {
                group.children = collapseExpandGroup(group.children, current);
                //group.isCollapsed = !group?.children?.some(x => !x.isCollapsed);
            }

            return group;
        });

        return newGroup;
    }

    const expandOrCollapseGroup = React.useCallback((currentGroup: IGroup) => {
        const newGroup = collapseExpandGroup(groups, currentGroup);
        groups$?.next(newGroup);
    }, [groups]);

    return (
        <>
            <TableRow key={groupKey}>
                <TableCell colSpan={columns.length + 1}>
                    {(gridConfig.selectionMode !== "none") ?
                        <>
                            {gridConfig.selectionMode === "single" ?
                                <></>
                                : <Checkbox
                                    checked={isChecked}
                                    onChange={(_, data) => handleSelectionChange(tryGetListValue(gridConfig.gridPrimaryField, [...pagedItems]?.splice(group.startIndex, group.count)) as any[], data.checked)} />}
                        </>
                        : <></>
                    }
                    <span style={{ paddingLeft: groupPadding + "px" }}>
                        <Button
                            aria-label='Open Column Settings'
                            size='small'
                            appearance="transparent"
                            iconPosition={"before"}
                            icon={group.isCollapsed ? <ChevronCircleUpRegular /> : <ChevronCircleDownRegular />}
                            onClick={() => expandOrCollapseGroup(group)}
                        >
                            <Body1Stronger>{group.name} ({group.count})</Body1Stronger>
                        </Button>
                    </span>
                </TableCell>
            </TableRow>
            {
                (!group.isCollapsed && group.children && group?.children?.length > 0) &&
                group?.children?.map((g, index) => <DataTableGroupedPage
                    key={index + group.key}
                    groupKey={index + group.key}
                    group={g}
                    pagedItems={pagedItems}
                    columns={columns}
                />)
            }
            {
                (!group.isCollapsed && !group.children?.length) &&
                [...pagedItems]?.splice(group.startIndex, group.count)?.map((item: any, index: number) => (
                    <>
                        {
                            <TableRow key={index}>
                                {(gridConfig.selectionMode !== "none") ?
                                    <TableCell key={index + "_group"} as="td">
                                        {gridConfig.selectionMode === "single" ?
                                            <Radio
                                                name={radioName}
                                                value={tryGetObjectValue(gridConfig.gridPrimaryField, item)}
                                                onChange={(_, data) => handleSelectionChange([data.value])}
                                            />
                                            : <Checkbox
                                                checked={selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, item))}
                                                onChange={(_, data) => handleSelectionChange([tryGetObjectValue(gridConfig.gridPrimaryField, item)], data.checked)} />}
                                    </TableCell>
                                    :<TableCell></TableCell>
                                }
                                {columns.map((column, index) => (
                                    <TableCell key={column.fieldName + "_" + index}>
                                        <TableCellLayout 
                                            media={column.mediaFieldName ? tryGetObjectValue(column.mediaFieldName, item) : undefined}
                                            appearance={column.onCellActionRender ? "primary" : undefined}>
                                            {column.onRender ? column.onRender(item) : tryGetObjectValue(column.fieldName, item)}
                                        </TableCellLayout>
                                        {column.onCellActionRender ? <TableCellActions>
                                            {column.onCellActionRender(item)}
                                        </TableCellActions> : <></>}
                                    </TableCell>
                                ))}
                            </TableRow>
                        }
                    </>
                ))
            }
        </>
    )
}
