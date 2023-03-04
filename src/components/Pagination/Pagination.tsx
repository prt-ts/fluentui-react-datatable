import { Button, Popover, PopoverSurface, PopoverTrigger, PositioningImperativeRef, Subtitle2Stronger } from '@fluentui/react-components'
import { ArrowNextFilled, ArrowPreviousFilled, ChevronCircleDownRegular, ChevronCircleUpRegular, ChevronDownFilled, DoubleTapSwipeUpFilled, DrawerArrowDownloadFilled, EditRegular, GroupDismissRegular, GroupListRegular, NextRegular, PreviousRegular, SearchSquareRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { usePaginationStyle } from '../../styles';

export const Pagination: React.FunctionComponent<{
    totalNumberOfPages: number;
    currentPage: number;
    onPageChange: (currentPage: number) => void;
}> = ({ totalNumberOfPages, currentPage, onPageChange }) => {
    // styles
    const paginationStyle = usePaginationStyle();

    return (
        <div className={paginationStyle.wrapper}>
            <Subtitle2Stronger>Showing Page {currentPage} of {totalNumberOfPages}</Subtitle2Stronger>
            <Button shape="circular" className={paginationStyle.pageBtn} icon={<PreviousRegular />} /> 
            <Button shape="circular" className={paginationStyle.pageBtn} icon={<ArrowPreviousFilled />} /> 
            <Button shape="circular" className={paginationStyle.pageBtn}>
                1
            </Button>
            <Button shape="circular" appearance={"primary"} className={paginationStyle.pageBtn}>
                2
            </Button>
            <Button shape="circular" className={paginationStyle.pageBtn}>
                3
            </Button>
            <Button shape="circular" className={paginationStyle.pageBtn}>
                4
            </Button>
            <Button shape="circular" className={paginationStyle.pageBtn}>
                5
            </Button>
            <Button shape="circular" className={paginationStyle.pageBtn} icon={<ArrowNextFilled />} /> 
            <Button shape="circular" className={paginationStyle.pageBtn} icon={<NextRegular />} /> 
        </div>
    )
} 