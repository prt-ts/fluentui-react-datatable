import { Button, Popover, PopoverSurface, PopoverTrigger, PositioningImperativeRef, Subtitle2Stronger } from '@fluentui/react-components'
import { ArrowNextFilled, ArrowPreviousFilled, ChevronCircleDownRegular, ChevronCircleUpRegular, ChevronDownFilled, DoubleTapSwipeUpFilled, DrawerArrowDownloadFilled, EditRegular, GroupDismissRegular, GroupListRegular, NextRegular, PreviousRegular, SearchSquareRegular } from '@fluentui/react-icons'
import { useObservableState } from 'observable-hooks';
import * as React from 'react'
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { getPageSelectionOptions } from '../../helpers';
import { useDataTableGrid } from '../../hooks';
import { usePaginationStyle } from '../../styles';

export const Pagination: React.FunctionComponent<{
}> = ({ }) => {
    // styles
    const paginationStyle = usePaginationStyle();

    // stores
    const { filteredItems$, pageSize$, currentPage$ } = useDataTableGrid();
    const currentPage = useObservableState(currentPage$ as BehaviorSubject<number>, 1);
    const pageOptions$ = React.useMemo(() => pageSize$?.pipe(
        combineLatestWith(currentPage$ as BehaviorSubject<number>, filteredItems$ as Observable<any[]>),
        map(([pSize, cPage, filteredItems]) => {
            const totalNumberOfPages = filteredItems?.length > 0 ? Math.ceil(filteredItems.length / pSize) : 1;
            const pageOptions = getPageSelectionOptions(cPage, totalNumberOfPages);
            return [pageOptions, totalNumberOfPages] as const;
        })
    ), []);
    const [pageOptions, totalNumberOfPages] = useObservableState(pageOptions$ as Observable<readonly [number[], number]>, [[1], 1]);


    const handlePageChanges = (action: "first" | 'previous' | "next" | "last" | "current", pageNumber: number) => {
        let nextPage = pageNumber ?? 1;
        switch (action) {

            case 'previous':
                nextPage = pageNumber <= 1 ? 1 : pageNumber;
                break;

            case 'next':
                nextPage = pageNumber > totalNumberOfPages ? totalNumberOfPages : pageNumber;
                break;

            case 'first':
            case 'last':
            case 'current':
            default:
                nextPage = pageNumber;
                break;
        }

        currentPage$?.next(nextPage);
    }


    return (
        <div className={paginationStyle.wrapper}>
            <Subtitle2Stronger>Showing Page {currentPage} of {totalNumberOfPages}</Subtitle2Stronger>
            <Button
                shape="circular"
                className={paginationStyle.pageBtn}
                icon={<PreviousRegular />}
                onClick={() => handlePageChanges("first", 1)}
                disabled={currentPage === 1} />
            <Button
                shape="circular"
                className={paginationStyle.pageBtn}
                icon={<ArrowPreviousFilled />}
                onClick={() => handlePageChanges("previous", currentPage - 1)}
                disabled={currentPage === 1} />
            {
                pageOptions.map((page, index) => {
                    const pageButton = page === currentPage ? (
                        <Button
                            key={index}
                            shape="circular"
                            appearance={"primary"}
                            className={paginationStyle.pageBtn}
                            aria-label={`Show Page ${page}`}>
                            {page}
                        </Button>
                    ) : (
                        <Button
                            key={index}
                            shape="circular"
                            className={paginationStyle.pageBtn}
                            onClick={() => handlePageChanges("current", page)}
                            aria-label={`Show Page ${page}`}>
                            {page}
                        </Button>
                    );
                    return pageButton;
                })
            }
            <Button
                shape="circular"
                className={paginationStyle.pageBtn}
                icon={<ArrowNextFilled />}
                onClick={() => handlePageChanges("next", currentPage + 1)}
                disabled={currentPage === totalNumberOfPages} />
            <Button
                shape="circular"
                className={paginationStyle.pageBtn}
                icon={<NextRegular />}
                onClick={() => handlePageChanges("last", totalNumberOfPages)}
                disabled={currentPage === totalNumberOfPages} />
        </div>
    )
} 