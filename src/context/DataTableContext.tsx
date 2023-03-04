import * as React from "react";
import { createContext } from "react";
import { useTableStore } from "../hooks"; 
import { IDataTableStore } from "../types/IDateTableStore";

export const DataTableContext = createContext<IDataTableStore>({});

export const DataTableProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }): JSX.Element => {

    const store = useTableStore();
    return (
        <DataTableContext.Provider value={
            { ...store } as const
        }>
            {children}
        </DataTableContext.Provider>
    );
}

