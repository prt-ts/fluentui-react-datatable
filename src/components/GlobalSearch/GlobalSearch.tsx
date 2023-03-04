import { Button, Input, useId } from '@fluentui/react-components'
import { ClearFormattingFilled, SearchRegular } from '@fluentui/react-icons';
import { useObservableState } from 'observable-hooks';
import * as React from 'react'
import { BehaviorSubject } from 'rxjs';
import { useDataTableGrid } from '../../hooks';
import { useGlobalSearchStyle } from '../../styles';

export const GlobalSearch: React.FunctionComponent<{ 
    debounceTimeSec?: number; 
}> = ({ debounceTimeSec }) => {
    const searchFieldId = useId("global-search");
    const globalSearchStyle = useGlobalSearchStyle();

    const {searchTerm$, currentPage$} = useDataTableGrid();

    const searchTerm = useObservableState(searchTerm$ as BehaviorSubject<string>, "");

    return (
        <div className={globalSearchStyle.wrapper}>
            <Input
                id={searchFieldId}
                contentBefore={<SearchRegular />}
                value={searchTerm}
                onChange={(_, data) => {
                    searchTerm$?.next(data.value);
                    currentPage$?.next(1);
                }}
            />
             <Button icon={<ClearFormattingFilled />} onClick={() =>{
                searchTerm$?.next("");
                currentPage$?.next(1);
             }}/> 
        </div>
    )
} 