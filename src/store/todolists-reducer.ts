import {todolistAPI, TodoType} from "../api/todolist-api";
import {AppThunk} from "./store";

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodoType
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

export type SetTodolistsAT = {
    type: 'SET_TODOLISTS'
    todolists: TodoType[]

}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsAT;


export type FilterType = "all" | "active" | "completed";

export type TodolistBLLType = TodoType & { filter: FilterType }


const initialState: Array<TodolistBLLType> = [];


export const todolistsReducer = (state: Array<TodolistBLLType> = initialState, action: ActionType): Array<TodolistBLLType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodo = action.todolist;
            const resultTodo: TodolistBLLType = {...newTodo, filter: 'all'}
            return [resultTodo, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET_TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))

        default:
            return state
    }
}

export const RemoveTodolist = (id: string): RemoveTodolistActionType => ({type: 'REMOVE_TODOLIST', id})
export const AddTodolist = (todolist: TodoType): AddTodolistActionType => ({type: 'ADD-TODOLIST', todolist,})
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

export const SetTodolists = (todolists: Array<TodoType>): SetTodolistsAT => ({type: 'SET_TODOLISTS', todolists});

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(SetTodolists((await todolistAPI.getTodolists()).data))
    } catch (e) {
        console.log(e)
    }
}

export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
    try {
        await todolistAPI.deleteTodolist(id)
        dispatch(RemoveTodolist(id))
    } catch (e) {
        console.log(e)
    }
}

export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(AddTodolist((await todolistAPI.createTodolist(title)).data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const updateTodolistTitleTC = (title: string, id: string): AppThunk => async dispatch => {
    try {
        await todolistAPI.updateTodolistTitle(title,id)
        dispatch(ChangeTodolistTitle(id,title))
    } catch (e) {
        console.log(e)
    }
}
