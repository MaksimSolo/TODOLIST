import {TasksStateType, TodolistsType} from "../App";

export type FirstTaskActionType = {
    type: ''
}

export type SecondTaskActionType = {
    type: ''
}

export type ActionsType = FirstTaskActionType | SecondTaskActionType;
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task=>task.id !==action.taskId)}
        default:
            throw new Error('I dont understnd this type')
    }
}

