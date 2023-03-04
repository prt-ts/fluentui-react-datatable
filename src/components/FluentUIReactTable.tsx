import * as React from "react";
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { IDataGridProps } from "../types/IDataGridProps";
import { DataTableProvider } from "../context";
import { GridLayout } from "./Layout";

export const FluentUIReactTable: React.FunctionComponent<IDataGridProps> = (props) => {
    return (
        <DataTableProvider>
            <FluentProvider theme={teamsLightTheme}>
                <GridLayout {...props} />
            </FluentProvider>
        </DataTableProvider>
    )
}



