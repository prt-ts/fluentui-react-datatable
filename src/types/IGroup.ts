export interface IGroup {
     /**
     * Unique identifier for the group.
     */
     key: string;
     /**
      * Display name for the group, rendered on the header.
      */
     name: string;
     /**
      * Start index for the group within the given items.
      */
     startIndex: number;
     /**
      * How many items should be rendered within the group.
      */
     count: number;
     /**
      * Nested groups, if any.
      */
     children?: IGroup[];
     /**
      * Number indicating the level of nested groups.
      */
     level?: number;
    
     /**
      * If all the items in the group are collapsed.
      */
     isCollapsed?: boolean;
     /**
      * If the items within the group are summarized or showing all.
      */
     isShowingAll?: boolean;
     /**
      * If drag/drop is enabled for the group header.
      */
     isDropEnabled?: boolean;
     /**
      * Arbitrary data required to be preserved by the caller.
      */
     data?: any;
     /**
      * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
      * If none is specified, the arai-label attribute will contain the group name
      */
     ariaLabel?: string;
     /**
      * Optional flag to indicate the group has more data to load than the current group count indicated.
      * This can be used to indicate that a plus should be rendered next to the group count in the header.
      */
     hasMoreData?: boolean;
}