import { Button, Dropdown, Option, Subtitle2Stronger, useId } from '@fluentui/react-components'
import { ArrowNextFilled, ArrowPreviousFilled, NextRegular, PreviousRegular } from '@fluentui/react-icons'
import * as React from 'react'
import { usePagination } from '../../hooks';
import { usePaginationStyle } from '../../styles';
import { DEFAULT_PAGE_OPTIONS, DEFAULT_PAGE_SIZE } from '../../utils';

export const Pagination: React.FunctionComponent<{
}> = ({ }) => {
    const pageSizeSelectionId = useId("page-size-selector");
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
        "10",
    ]);
    const [value, setValue] = React.useState("Elvia Atkins");
    // styles
    const paginationStyle = usePaginationStyle();

    // stores
    const { pageSize, currentPage, totalNumberOfPages, pageOptions, handlePageChanges, handlePageSizeChange } = usePagination();


    return (
        <div className={paginationStyle.wrapper}>
            <div className={paginationStyle.pageSelectionWrapper}>
                <Dropdown
                    id={pageSizeSelectionId}
                    selectedOptions={[`${pageSize}`]}
                    value={`${pageSize}`}
                    placeholder="Select Page Size"
                    onOptionSelect={(_, data) => handlePageSizeChange(+data.selectedOptions?.[0] ?? DEFAULT_PAGE_SIZE)}
                    className={paginationStyle.pageSelectionDropdown}
                >
                    {
                        DEFAULT_PAGE_OPTIONS?.map((option) => (
                            <Option key={option.key} value={`${option.key}`}>
                                {option.text}
                            </Option>
                        ))
                    }

                </Dropdown>
            </div>
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