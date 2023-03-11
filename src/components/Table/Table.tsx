import { Button, Checkbox, Radio, TableCell, TableCellActions, TableCellLayout, TableRow, useId } from '@fluentui/react-components'
import { useObservableState } from 'observable-hooks'
import * as React from 'react'
import { useDataTableGrid, useSelection } from '../../hooks' 
import { DefaultGridConfig, IColumn, IGridConfig } from '../../types'
import { tryGetObjectValue } from '../../utils'

export const DataTablePage: React.FunctionComponent<{ 
    columns: IColumn[]
    pagedItems: any[] 
}> = ({ columns, pagedItems }) => {
    const {gridConfig$} = useDataTableGrid();
    const { verifySelected, handleSelectionChange } = useSelection();
    const radioName = useId("radio");
    const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

    const gridConfig = useObservableState<IGridConfig>(gridConfig$, DefaultGridConfig);

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
                                    checked={verifySelected(item)}
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
            ))}
        </>
    )
}
