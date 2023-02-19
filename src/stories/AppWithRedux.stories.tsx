import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import AppWithRedux from "../app/AppWithRedux";

export default {
    title: 'Todolist10/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],

} as unknown as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>;

export const AppWithReduxStory = Template.bind({});



