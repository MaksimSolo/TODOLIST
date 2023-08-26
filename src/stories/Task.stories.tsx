import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task, TaskProps} from "app/components/todos-list/todo-list/tasks/task/task";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default  {
    title: 'todo-list/tasks',
    component: Task,
    args: {
        changeStatus: action('Status of tasks changed'),
        changeTaskTitle: action('Title of tasks changed'),
        removeTask: action('tasks have been removed:remove-button clicked'),
    },
    decorators: [ReduxStoreProviderDecorator],

} as unknown as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args:TaskProps) => <Task {...args} />;

export const TaskIsDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDone.args = {
    todolistID: 'todolistID1',
    taskID: '2',
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    todolistID: 'todolistID2',
    taskID: '6',
};

