import { Button } from '@fluentui/react-components'
import * as React from 'react'
import { IColumn } from '../../types'

import {
    CheckmarkFilled,
} from "@fluentui/react-icons";
import { useGrouping } from '../../hooks';

export const GroupColumn: React.FunctionComponent<{ column: IColumn }> = ({ column }) => {
    const { hasColumnGrouped, handleGroupColumn, handleResetAllGroups } = useGrouping();

    return (
        <>
            <Button
                onClick={() => handleGroupColumn(column)}
                appearance="transparent" icon={column?.isGrouped ? <CheckmarkFilled /> : <></>}>
                Group by {column.headerLabel}
            </Button>
            {hasColumnGrouped ? <Button
                onClick={() => handleResetAllGroups()}
                appearance="transparent" icon={<></>}>
                Reset All Groups
            </Button> : <></>}
        </>
    )
} 