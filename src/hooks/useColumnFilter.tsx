import * as React from 'react'
import { useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import { IColumn } from "../types";
import { useDataTableGrid } from "./useDataTable";
import { LogicalExpression } from '@prt-ts/filter-expreression-eval';

export const useColumnFilter = (filterExpression: LogicalExpression) => {
    const { columns$ } = useDataTableGrid();
    const columns = useObservableState(columns$ as BehaviorSubject<IColumn[]>, []);

    const [colFilterExpression, setColFilterExpression] = React.useState<LogicalExpression>(filterExpression)

    const handleFilterConditionChange = (condition: "or" | "and") => {
        setColFilterExpression(exp => ({
            ...exp,
            condition: condition
        }))

    }

    React.useEffect(() => console.log(colFilterExpression), [colFilterExpression])

    return {colFilterExpression, handleFilterConditionChange }
};