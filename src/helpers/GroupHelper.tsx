import { IColumn, IGroup } from "../types";
import { tryGetObjectValue } from "../utils";

function getLeafGroupKey(key: string, separator: string): string {
  let leafKey = key;
  if (key.indexOf(separator) !== -1) {
    const arrKeys = key.split(separator);
    leafKey = arrKeys[arrKeys.length - 1];
  }
  return leafKey;
}

function getGroups(
  groupedItems: any[],
  column: IColumn,
  isExpanded: boolean,
  parentGroup?: IGroup
): IGroup[] {
  const separator = "-";
  const groups = groupedItems.reduce(
    (current: IGroup[], item: any, index: number) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = tryGetObjectValue(column.fieldName, item) ?? "";

      if (
        !currentGroup ||
        getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue
      ) {
        current.push({
          key:
            (parentGroup ? parentGroup.key + separator : "") + itemColumnValue,
          name: `${column?.headerLabel}: ${itemColumnValue}`,
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? parentGroup.level! + 1 : 0,
          isCollapsed: !isExpanded,
        });
      } else {
        currentGroup.count++;
      }
      return current;
    },
    [] as IGroup[]
  );

  return groups;
}
 
export function groupItems(
  sortedItems: any[],
  columns: IColumn[],
  isExpanded: boolean,
  parentGroup?: IGroup,
  existingGroups?: IGroup[],
): IGroup[] {
  if (columns.length) {
    //first calculate top level group
    let groups: IGroup[] = getGroups(
      sortedItems,
      columns?.[0],
      isExpanded,
      parentGroup
    )?.map(newGroup => {
      const existingGroup = existingGroups?.filter(x => x.key == newGroup.key)?.[0];
      return {
        ...newGroup,
        isCollapsed : existingGroup ? existingGroup.isCollapsed : newGroup.isCollapsed
      }
    }); 

    if (columns.length > 1) {
      for (let group of groups) {
        const existingGroup = existingGroups?.filter(x => x.key == group.key)?.[0];

        group.children = groupItems(
          [...sortedItems]?.splice(group.startIndex, group.count),
          [...columns]?.splice(1),
          isExpanded,
          group,
          existingGroup?.children
        );
      }
    }

    //console.log("Grouping")
    return groups;
  }

  return []; 
}