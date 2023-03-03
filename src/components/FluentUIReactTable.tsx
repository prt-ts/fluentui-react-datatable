import * as React from "react"; 
import { Avatar, FluentProvider, PresenceBadgeStatus, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, teamsLightTheme } from '@fluentui/react-components';
import { IDataGridProps } from "../types/IDataGridProps";

export const FluentUIReactTable: React.FunctionComponent<IDataGridProps> = (props) => {
    return (
        <div>
            <FluentProvider theme={teamsLightTheme}>
                <FluentUIReactTableContainer {...props} />
            </FluentProvider>
        </div>
    )
}

const FluentUIReactTableContainer: React.FunctionComponent<IDataGridProps> = ({
    columns, items
}) => {
    return (
        <Table arial-label="Default table">
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.fieldName}>
                            {column.headerLabel}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items?.map((item) => (
                    <TableRow key={item.file.label}>
                        <TableCell>
                            <TableCellLayout media={item.file.icon}>
                                {item.file.label}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout
                                media={
                                    <Avatar
                                        aria-label={item.author.label}
                                        name={item.author.label}
                                        badge={{
                                            status: item.author.status as PresenceBadgeStatus,
                                        }}
                                    />
                                }
                            >
                                {item.author.label}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>{item.lastUpdated.label}</TableCell>
                        <TableCell>
                            <TableCellLayout media={item.lastUpdate.icon}>
                                {item.lastUpdate.label}
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
 
