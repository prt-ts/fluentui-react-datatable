import { Checkbox, Radio, TableCell, TableCellLayout, TableRow, useId } from '@fluentui/react-components'
import * as React from 'react'
import { IColumn, SelectionModeType } from '../../types'
import { tryGetObjectValue } from '../../utils'

export const DataTablePage: React.FunctionComponent<{ 
    columns: IColumn[]
    pagedItems: any[],
    selectionMode: SelectionModeType,
    gridPrimaryField: string
}> = ({ columns, selectionMode, pagedItems, gridPrimaryField }) => {
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
        <>
            {pagedItems?.map((item: any, index: number) => (
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
                                {column.onRender ? column.onRender(item) : tryGetObjectValue(column.fieldName, item)}
                            </TableCellLayout>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}
