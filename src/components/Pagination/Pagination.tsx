import { Button, Subtitle2Stronger } from '@fluentui/react-components'
import { ArrowNextFilled, ArrowPreviousFilled, NextRegular, PreviousRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { usePagination } from '../../hooks';
import { usePaginationStyle } from '../../styles';

export const Pagination: React.FunctionComponent<{
}> = ({ }) => {
    // styles
    const paginationStyle = usePaginationStyle();

    // stores
    const { currentPage, totalNumberOfPages, pageOptions, handlePageChanges } = usePagination();


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