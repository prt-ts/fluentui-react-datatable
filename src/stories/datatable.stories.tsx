import * as React from 'react'
import { FluentUIReactTable } from "../index"
import { columns, items } from './data';
import { ComponentStory, ComponentMeta } from '@storybook/react'; 


export default {
    title: 'Fluent UI DataTable',
    component: FluentUIReactTable,
} as ComponentMeta<typeof FluentUIReactTable>;

const Template: ComponentStory<typeof FluentUIReactTable> = (args) => {
    const [data, setData] = React.useState<any[]>()

    const getTodo = async () => {
        const data : any[] = await getData();
        setData(data);
        console.log(data);
        
    }

    React.useEffect(() => {
        getTodo();
    }, [])


    return <FluentUIReactTable {...args} items={data}/>
};

export const DefaultExample = Template.bind({});

DefaultExample.args = {
    gridName: 'Example Grid',
    gridPrimaryField: 'id',
    columns: [...columns],
    items: [...items]  
}; 

/**
 * write a function to get 10000 dommy data from opensource remote data source
 */
const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return data;
}