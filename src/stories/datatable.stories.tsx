import * as React from 'react'
import { FluentUIReactTable } from "../index"
import { columns, items } from './data';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Fluent UI DataTable',
    component: FluentUIReactTable,
} as ComponentMeta<typeof FluentUIReactTable>;

const Template: ComponentStory<typeof FluentUIReactTable> = (args) => <FluentUIReactTable {...args} />;

export const DefaultExample = Template.bind({});

DefaultExample.args = {
    gridName: 'Example Grid',
    gridPrimaryField: 'file.label',
    items: [...items],
    columns: [...columns]
};
