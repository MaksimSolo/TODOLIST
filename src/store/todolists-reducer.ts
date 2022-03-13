import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterType
}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;


const initialState: Array<TodolistsType> = [];


export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodo: TodolistsType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const RemoveTodolist = (id: string): RemoveTodolistActionType => ({type: 'REMOVE_TODOLIST', id})
export const AddTodolist = (title: string): AddTodolistActionType => ({type: 'ADD-TODOLIST', title, id: v1()})
export const ChangeTodolistTitle = (id: string, title: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})
export const ChangeTodolistFilter = (id: string, filter: FilterType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})

