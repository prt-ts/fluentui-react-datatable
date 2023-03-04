import { Button, Popover, PopoverSurface, PopoverTrigger, PositioningImperativeRef } from '@fluentui/react-components'
import { ChevronCircleDownRegular, ChevronCircleUpRegular, ChevronDownFilled, DoubleTapSwipeUpFilled, DrawerArrowDownloadFilled, EditRegular, GroupDismissRegular, GroupListRegular, SearchSquareRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { IColumn } from './../../types';
import { useHeaderPopoverStyle } from '../../styles';

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
                    icon={isOpen ? <ChevronCircleUpRegular /> : <ChevronCircleDownRegular />}
                >
                    {
                        (column.isFiltered ? <SearchSquareRegular fontSize={20}/> : <></>)
                    }
                    {
                        (column.isGrouped ? <GroupListRegular fontSize={20}/> : <></>)
                    }
                </Button>
            </PopoverTrigger>
            <PopoverSurface className={headerPopoverClasses.popoverSurface}>
                isOpen : {isOpen}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur maxime pariatur, magni at fugiat non officiis! Consequatur laboriosam eos voluptas doloremque? Omnis earum corporis sit velit consequuntur, quisquam voluptas.
            </PopoverSurface>
        </Popover>
    )
} 