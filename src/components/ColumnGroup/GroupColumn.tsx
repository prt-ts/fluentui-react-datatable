import { Button } from '@fluentui/react-components'
import * as React from 'react'
import { IColumn } from '../../types'

import {
    CheckmarkFilled,
} from "@fluentui/react-icons";
import { useDataTableGrid } from '../../hooks';
import { useObservableState } from 'observable-hooks';
import { BehaviorSubject } from 'rxjs';

export const GroupColumn: React.FunctionComponent<{ column: IColumn }> = ({ column }) => {

    const { columns$ } = useDataTableGrid();
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);

    const handleGroupColumn = React.useCallback((column: IColumn) => {
        const lastMaxGroupOrder = Math.max.apply(Math, [
            ...columns.map((col) => col.groupOrderNumber ?? 1),
          ]);

        const newColumn = columns.map(col => {
            if (column.fieldName == col.fieldName) {
                col.isGrouped = !col.isGrouped;
                col.groupOrderNumber = !col.isGrouped? lastMaxGroupOrder + 1 : 0;
            }
            return col;
        })

        columns$?.next(newColumn)

    }, [columns]);

    const handleResetAllGroups = React.useCallback(() => {
        const newColumn = columns.map(col => {
            col.isGrouped = false;
            col.groupOrderNumber = 0;
            return col;
        })

        columns$?.next(newColumn)

    }, [columns]);

    const isGrouped: boolean = React.useMemo(() => columns?.some(x => x.isGrouped), [columns])


    return (
        <>
            <Button
                onClick={() => handleGroupColumn(column)}
                appearance="transparent" icon={column?.isGrouped ? <CheckmarkFilled /> : <></>}>
                Group by {column.headerLabel}
            </Button>
            {isGrouped ? <Button
                onClick={() => handleResetAllGroups()}
                appearance="transparent" icon={<></>}>
                Reset All Group
            </Button> : <></>}
        </>
    )
} 