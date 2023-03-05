import { isValidDate, isValidNumber } from "@prt-ts/filter-expreression-eval/dist/utils";
import { IColumn } from "../types";
import { tryGetObjectValue } from "../utils";

const compareObjects = (
  a: any,
  b: any,
  key: string,
  isSortedDescending: boolean | undefined
) => {
    a[key] as string
  const firstKeyValue = tryGetObjectValue(key, a);
  const secondKeyValue = tryGetObjectValue(key, b);
  if (isValidNumber(firstKeyValue) && isValidNumber(secondKeyValue)) {
    return (isSortedDescending ? +firstKeyValue < +secondKeyValue : +firstKeyValue > +secondKeyValue)
      ? 1
      : -1;
  } else if (isValidDate(firstKeyValue) && isValidDate(secondKeyValue)) {
    return (
      isSortedDescending
        ? new Date(firstKeyValue) < new Date(secondKeyValue)
        : new Date(firstKeyValue) > new Date(secondKeyValue)
    )
      ? 1
      : -1;
  } else {
    return (isSortedDescending ? firstKeyValue < secondKeyValue : firstKeyValue > secondKeyValue) ? 1 : -1;
  }
};

function copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items.slice(0)
    .sort((a: T, b: T) => compareObjects(a, b, key as string, isSortedDescending));
}

export function sortGrid(items: any[], columns: IColumn[]): any[] {
  const sortColumn = columns?.filter((x) => x.isSorted)?.[0];
  if (sortColumn) {
    return copyAndSort(
      items,
      sortColumn?.fieldName,
      sortColumn?.isSortedDescending
    );
  }
  return items;
}