import { Button, Divider, Popover, PopoverSurface, PopoverTrigger, PositioningImperativeRef } from '@fluentui/react-components'
import { ChevronCircleDownRegular, ChevronCircleUpRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { IColumn } from './../../types';
import { useHeaderPopoverStyle } from '../../styles';
import { FilterContainer } from '../ColumnFilterTypes/FilterContainer';
import { GroupColumn } from '../ColumnGroup/GroupColumn';
import { FilteredIcon, GroupedIcon, PopoverClosedIcon, PopoverOpenedIcon } from '../../utils';

export const HeaderPopover: React.FunctionComponent<{
    column: IColumn
}> = ({ column }) => {
    // styles
    const headerPopoverClasses = useHeaderPopoverStyle();

    // refs
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const positioningRef = React.useRef<PositioningImperativeRef>(null);

    // states
    const [isOpen, setIsOpen] = React.useState<boolean | undefined>(false)

    return (
        <Popover size='small' withArrow positioning={{ positioningRef, align: "end" }} open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)}>
            <PopoverTrigger disableButtonEnhancement>
                <Button
                    ref={buttonRef}
                    aria-label='Open Column Settings'
                    size='small'
                    appearance="transparent"
                    iconPosition={"after"}
                    icon={isOpen ? <PopoverOpenedIcon /> : <PopoverClosedIcon />}
                >
                    {
                        (column.isFiltered ? <FilteredIcon fontSize={20} /> : <></>)
                    }
                    {
                        (column.isGrouped ? <GroupedIcon fontSize={20} /> : <></>)
                    }
                </Button>
            </PopoverTrigger>
            <PopoverSurface className={headerPopoverClasses.popoverSurface}>
                {column?.disableFilter ? <></> : <FilterContainer column={column}/>}
                {column?.disableGrouping ? <></> : <>
                    <Divider />
                    <GroupColumn column={column} />
                </>}
            </PopoverSurface>
        </Popover>
    )
} 