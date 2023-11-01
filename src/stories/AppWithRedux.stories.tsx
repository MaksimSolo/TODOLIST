import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import AppWithRedux from "../app/AppWithRedux";
import {HashRouter} from "react-router-dom";

export default {
  title: 'TodoList/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],

} as unknown as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () =>
  <HashRouter>
    <AppWithRedux/>
  </HashRouter>;

export const AppWithReduxStory = Template.bind({});



