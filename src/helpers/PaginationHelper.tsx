import { DEFAULT_NUMBER_OF_PAGE_BTN, range } from "../utils";

export const getPageSelectionOptions = (
    currentPage: number,
    totalNumberOfPages: number 
): number[] => {
    let start = currentPage - Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);
    let end = currentPage + Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);

    if (start < 1) {
        start = 1;
        end = totalNumberOfPages > DEFAULT_NUMBER_OF_PAGE_BTN ? DEFAULT_NUMBER_OF_PAGE_BTN
            : totalNumberOfPages;
    } else if (end > totalNumberOfPages) {
        const possibleStart =
        totalNumberOfPages - DEFAULT_NUMBER_OF_PAGE_BTN + 1;
        start = possibleStart < 1 ? 1 : possibleStart;
        end = totalNumberOfPages;
    } 
    const currentPageOptions: number[] = end - start >= 0 ? range(start, end) : [];
    return currentPageOptions?.length ? [...currentPageOptions] : [1];
};