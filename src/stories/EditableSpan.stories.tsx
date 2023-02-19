import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../app/components/EditableSpan/EditableSpan";


export default {
    title: 'Todolist10/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Callback: change value'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
    title: 'Span default value',
    changeTitle: action('value of Editable Span successfully changed')
};


