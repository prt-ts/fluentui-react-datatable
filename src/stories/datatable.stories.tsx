import * as React from 'react'
import { FluentUIReactTable } from "../index"
import { columns, items } from './data';
import { ComponentStory, ComponentMeta } from '@storybook/react'; 


export default {
    title: 'Fluent UI DataTable',
    component: FluentUIReactTable,
} as ComponentMeta<typeof FluentUIReactTable>;

const Template: ComponentStory<typeof FluentUIReactTable> = (args) => {
    // const [data, setDate] = React.useState<any[]>()

    // React.useEffect(() => {
    //     fetch("./rows.json").then(res => res.json()).then(res => {
    //         console.log(res)
    //         setDate(res);
    //     });
    // }, [])


    return <FluentUIReactTable {...args} />
};

export const DefaultExample = Template.bind({});

DefaultExample.args = {
    gridName: 'Example Grid',
    gridPrimaryField: 'file.label',
    columns: [...columns],
    items: [...items] 
};
