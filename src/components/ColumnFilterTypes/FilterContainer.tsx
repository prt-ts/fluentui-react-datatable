import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components'
import * as React from 'react'
import { useColumnFilter } from '../../hooks';
import { IColumn } from '../../types';
import { TextSearch } from './TextSearch'

const conditionOptions = [{ key: "or", text: "Match Any" }, { key: "and", text: "Match All" }];
const styles = makeStyles({
    root: {
        minWidth: "100%"
    },
});

export const FilterContainer: React.FunctionComponent<{ column: IColumn }> = ({ column }) => {
    const conditionDropdownId = useId("filter-conditiion");
    const {colFilterExpression, handleFilterConditionChange } = useColumnFilter(column?.filterExpression ?? {
        condition : "or",
        expressions : []
    })
    const [filterType, _] = React.useState(column?.filterType ?? "text");
    


    const [value, setValue] = React.useState("Match Any");

    const onOptionSelect = (ev: any, data: any) => {
        console.log(data) 
        setValue(data.optionText ?? "");
        handleFilterConditionChange(data.selectedOptions?.[0]?? "or")
    };


    return (
        <>
            <Dropdown
                aria-labelledby={conditionDropdownId}
                placeholder="Select an condition"
                value={value}
                selectedOptions={[colFilterExpression?.condition]}
                onOptionSelect={onOptionSelect}
                style={{ minWidth: "100%" }}
            >
                {conditionOptions.map((option, index) => (
                    <Option key={option.key} value={option.key} defaultChecked={index == 0}>
                        {option.text}
                    </Option>
                ))}
            </Dropdown>
            {filterType === "text" ? <TextSearch /> : <></>}
        </>
    )
} 