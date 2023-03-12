import { ArrowSortDownFilled, ArrowSortFilled, ArrowSortUpFilled, ChevronDownRegular, ChevronUpFilled, GroupListRegular, SearchSquareRegular } from "@fluentui/react-icons";
import * as React from "react";

// sort icons
export const SortUnsortedIcon = () => <ArrowSortFilled />;
export const SortSortedDescIcon = () => <ArrowSortDownFilled />;
export const SortSortedAscIcon = () => <ArrowSortUpFilled />;

// header popover
export const PopoverOpenedIcon = () => <ChevronUpFilled />;
export const PopoverClosedIcon = () => <ChevronDownRegular />;


// group icon
export const GroupedIcon = (props : any) => <GroupListRegular {...props}/>;

//filter
export const FilteredIcon = (props : any) => <SearchSquareRegular {...props}/>;
