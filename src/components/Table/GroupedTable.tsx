import { Body1Stronger, Button, Checkbox, Radio, TableCell, TableCellLayout, TableRow, useId } from '@fluentui/react-components'
import { ChevronCircleDownRegular, ChevronCircleUpRegular } from '@fluentui/react-icons'
import { useObservableState } from 'observable-hooks'
import * as React from 'react'
import { BehaviorSubject } from 'rxjs'
import { useDataTableGrid } from '../../hooks'
import { IColumn, IGroup, SelectionModeType } from '../../types'
import { tryGetListValue, tryGetObjectValue } from '../../utils'

export const DataTableGroupedPage: React.FunctionComponent<{
    group: IGroup,
    columns: IColumn[]
    pagedItems: any[],
    selectionMode: SelectionModeType,
    gridPrimaryField: string
}> = ({ group, columns, pagedItems, selectionMode, gridPrimaryField }) => {
    const radioName = useId("radio");
    const { selectedItems$, groups$ } = useDataTableGrid();
    const selectedValues = useObservableState(selectedItems$ as BehaviorSubject<any[]>, []);
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

    const groupPadding = 20 * (group?.level ?? 0);

    const isChecked = React.useMemo((): boolean | "mixed" => {
        const isAllSelected = [...pagedItems]?.splice(group.startIndex, group.count)
            ?.every((x) => selectedValues?.includes(tryGetObjectValue(gridPrimaryField, x)));

        if (!isAllSelected) {
            const isPartialSelected = [...pagedItems]
                ?.splice(group.startIndex, group.count)
                ?.some((x) => selectedValues?.includes(tryGetObjectValue(gridPrimaryField, x)));

            return isPartialSelected ? "mixed" : false;
        }

        return true;
    }, [pagedItems, selectedValues, gridPrimaryField, group]);

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
            <TableRow>
                <TableCell colSpan={columns.length + 1}>
                    {(selectionMode !== "none") ?
                        <>
                            {selectionMode === "single" ?
                                <></>
                                : <Checkbox
                                    checked={isChecked}
                                    onChange={(_, data) => handleSelectionChange(tryGetListValue(gridPrimaryField, [...pagedItems]?.splice(group.startIndex, group.count)) as any[], data.checked)} />}
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
                    key={index}
                    group={g}
                    pagedItems={pagedItems}
                    columns={columns}
                    selectionMode={selectionMode}
                    gridPrimaryField={gridPrimaryField}
                />)
            }
            {
                (!group.isCollapsed && !group.children?.length) &&
                [...pagedItems]?.splice(group.startIndex, group.count)?.map((item: any, index: number) => (
                    <>
                        {
                            <TableRow key={index}>
                                {(selectionMode !== "none") ?
                                    <TableCell as="td">
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
                                        <TableCellLayout media={column.mediaFieldName ? tryGetObjectValue(column.mediaFieldName, item) : undefined}>
                                            {tryGetObjectValue(column.fieldName, item)}
                                        </TableCellLayout>
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
