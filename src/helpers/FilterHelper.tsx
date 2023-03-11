import { BasicExpression, Expression, FilterValueType, LogicalExpression } from "@prt-ts/filter-expreression-eval";
import { IColumn } from "../types";
import { tryGetObjectValue } from "../utils";

function evaluateLogicalExpression(
    expr: LogicalExpression,
    obj: Object
): boolean { 
    const { condition, expressions } = expr;
    const fn = condition === "and" ? expressions.every : expressions.some;
    return fn.call(expressions, (expr: any) => {
        const isQuery = "condition" in expr;
        if (isQuery) {
            return evaluateLogicalExpression(expr, obj);
        } else {
            return evaluateExpression(expr, obj);
        }
    });
}

function evaluateExpression(
    expression: BasicExpression,
    obj: any
): boolean {
    const { key, operation, value } = expression;
    const propValue = (obj[key] as FilterValueType);
    switch (operation) {
        case "greater_than":
            return `${propValue}`?.toLocaleLowerCase() > `${value}`?.toLocaleLowerCase();
        case "less_than":
            return (
                `${propValue}`?.toLocaleLowerCase() < `${value}`?.toLocaleLowerCase()
            );
        case "contains":
            return new RegExp(`${value}`?.toLocaleLowerCase() + "").test(
                `${propValue}`?.toLocaleLowerCase() + ""
            );
        case "starts_with":
            return new RegExp("^" + `${value}`?.toLocaleLowerCase() + "").test(
                `${propValue}`?.toLocaleLowerCase() + ""
            );

        case "includes":
            return (
                Array.isArray(value) &&
                (value.length == 0 || (value as any)?.indexOf(propValue) > -1)
            );

        case "date_equal":
        case "date_greater_than":
        case "date_less_than":
            return compareDates(propValue, value, operation);

        case "equal":
        default:
            return (
                `${propValue}`?.toLocaleLowerCase() == `${value}`?.toLocaleLowerCase()
            );
    }
}

export function buildExpression(
    expression: LogicalExpression,
    currentExpession: Expression
): LogicalExpression {
    if ((currentExpession as LogicalExpression)?.condition) {
       // console.log("Logical Expression");
    } else {
       // console.log("Basic Expression");
        currentExpession = currentExpession as BasicExpression;
        const existingExpression = expression?.expressions?.filter(
            (exp: any) => {
                return (exp as BasicExpression).key == (currentExpession as BasicExpression).key
            }
        )?.[0];

        if (existingExpression) {
            (existingExpression as BasicExpression).value = currentExpession.value;
            (existingExpression as BasicExpression).operation =
                currentExpession.operation;
        } else {
            expression.expressions.push(currentExpession);
        }

        expression.expressions = expression?.expressions?.filter(
            (exp: any) => !!(exp as BasicExpression).value
        );
    }

    console.log(expression);
    return expression;
}

function compareDates(
    date1: any,
    date2: any,
    compareType: "date_equal" | "date_greater_than" | "date_less_than"
) {
    try {
        const d1 = new Date(date1);
        d1.setHours(0, 0, 0);

        const d2 = new Date(date2);
        d2.setHours(0, 0, 0);

        switch (compareType) {
            case "date_equal":
                return d1 == d2;

            case "date_greater_than":
                return d1 > d2;

            case "date_less_than":
                return d1 < d2;
        }
    } catch {
        return false;
    }
}

export function filterGrid(items: any[], searchTerm: string, columns: IColumn[]) {
    // copy items
    let filteredItems: any[] = [...items];

    // verify if global filter exists -- if such, apply filter
    if (searchTerm?.length) {
        const filedKeys = columns?.map(x => x.fieldName);
        filteredItems = filteredItems?.filter(function (item: any) {
            return filedKeys?.some(function (k) {
                const fieldValue = tryGetObjectValue(k, item)
                return (
                    fieldValue
                        ?.toString()
                        ?.toLowerCase()
                        ?.indexOf(`${searchTerm}`?.toLocaleLowerCase()) > -1
                );
            });
        });
    }

    // check for all columnlevel filter
    const allColumnExpressions = columns?.filter((col) => !!col.filterExpression)
        ?.map((col) => col.filterExpression as LogicalExpression);

    const expression: LogicalExpression = {
        condition: "and",
        expressions: allColumnExpressions,
    };

    // check column level expression, if such, evaluate and apply column level filter
    if (expression.expressions) {
        filteredItems = filteredItems?.filter((item: any) =>
            evaluateLogicalExpression(expression, item)
        );
    }

    //console.log("Filtering");
    return filteredItems;
}

export function hasFilterExpression(filter: LogicalExpression) {
    if (
        filter &&
        filter?.expressions?.length &&
        filter?.expressions?.some(
            (exp: any) => {
                const basicExp = exp as BasicExpression;
                !!basicExp.value &&
                    ((basicExp.value as any)?.length ||
                        (basicExp.value instanceof Date && basicExp.value?.getMonth()))
            }
        )
    ) {
        return true;
    }
    return false;
}

