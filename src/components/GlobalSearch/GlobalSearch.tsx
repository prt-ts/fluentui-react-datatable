import { Button, Input, useId } from '@fluentui/react-components'
import { CalendarMonthRegular, ClearFormattingFilled, SearchRegular } from '@fluentui/react-icons';
import * as React from 'react'
import { useGlobalSearchStyle } from '../../styles';

export const GlobalSearch: React.FunctionComponent<{
    defaultSearchText?: string;
    debounceTimeSec?: number;
    onSearchInputChange: (searchTerm: string) => void;
}> = ({ defaultSearchText, debounceTimeSec, onSearchInputChange }) => {
    const searchFieldId = useId("global-search");
    const globalSearchStyle = useGlobalSearchStyle();

    return (
        <div className={globalSearchStyle.wrapper}>
            <Input
                id={searchFieldId}
                contentBefore={<SearchRegular />}
                onChange={(_, data) => onSearchInputChange(data.value)}
            />
             <Button icon={<ClearFormattingFilled />} /> 
        </div>
    )
} 