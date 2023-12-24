import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm, AddItemFormType} from 'common/components/AddItemForm/AddItemForm';
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'button inside form clicked: added item '
        }
    }

} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args: AddItemFormType) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    // addItem: action('button inside form clicked: added item ')
    // addItem: (title: string) => Promise<unknown>
};


