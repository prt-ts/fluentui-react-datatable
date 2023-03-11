import { Checkbox, Radio, TableCell, TableCellLayout, TableRow, useId } from '@fluentui/react-components'
import { useObservableState } from 'observable-hooks'
import * as React from 'react'
import { useDataTableGrid } from '../../hooks'
import { DefaultGridConfig, IColumn, IGridConfig } from '../../types'
import { tryGetObjectValue } from '../../utils'

export const DataTablePage: React.FunctionComponent<{ 
    columns: IColumn[]
    pagedItems: any[] 
}> = ({ columns, pagedItems }) => {
    const {gridConfig$} = useDataTableGrid();
    const radioName = useId("radio");
    const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

    const gridConfig = useObservableState<IGridConfig>(gridConfig$, DefaultGridConfig);

    const handleSelectionChange = React.useCallback((value: any[], isSelected: boolean | "mixed" = true) => {
        console.log(value, isSelected);
        if (gridConfig.selectionMode === "single") {
            setSelectedValues([...value]);
        } else {
            setSelectedValues(sValue => {
                if (isSelected) {
                    return [...sValue, ...value]
                }

                return [...sValue?.filter(s => !value?.includes(s))]

            });
        }

    }, [gridConfig.selectionMode, selectedValues]);

    return (
        <>
            {pagedItems?.map((item: any, index: number) => (
                <TableRow key={index}>
                    {(gridConfig.selectionMode !== "none") ?
                        <TableCell as="td">
                            {gridConfig.selectionMode  === "single" ?
                                <Radio
                                    name={radioName}
                                    value={tryGetObjectValue(gridConfig.gridPrimaryField, item)}
                                    onChange={(_, data) => handleSelectionChange([data.value])}
                                />
                                : <Checkbox
                                    checked={selectedValues?.includes(tryGetObjectValue(gridConfig.gridPrimaryField, item))}
                                    onChange={(_, data) => handleSelectionChange([tryGetObjectValue(gridConfig.gridPrimaryField, item)], data.checked)} />}
                        </TableCell>
                        : <></>
                    }
                    {columns.map((column, index) => (
                        <TableCell key={column.fieldName + "_" + index}>
                            <TableCellLayout media={column.mediaFieldName ? tryGetObjectValue(column.mediaFieldName, item) : undefined}>
                                {column.onRender ? column.onRender(item) : tryGetObjectValue(column.fieldName, item)}
                            </TableCellLayout>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}
