import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import App from "app/ui/App";
import {HashRouter} from "react-router-dom";

export default {
  title: 'TodoList/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],

} as unknown as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () =>
  <HashRouter>
    <App/>
  </HashRouter>;

export const AppWithReduxStory = Template.bind({});



