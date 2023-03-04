import * as React from 'react'
import { storiesOf } from "@storybook/react"

import { FluentUIReactTable } from "../index"
import { columns, items } from './data';

const storeies = storiesOf("DataTable Test", module);

storeies.add("DataTable", () => {
    return (<FluentUIReactTable 
        gridName='ABC' 
        gridPrimaryField='file.label' 
        items={items} 
        columns={columns} 
        selectionMode={"multiple"}
    />)
});