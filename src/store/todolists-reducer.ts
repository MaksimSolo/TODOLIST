import {todolistAPI, TodoType} from "../api/todolist-api";
import {AppThunk} from "./store";

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

//action-creators
export const RemoveTodolist = (id: string) => ({type: 'REMOVE_TODOLIST', id}) as const
export const AddTodolist = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist,}) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const
export const SetTodolists = (todolists: Array<TodoType>) => ({type: 'SET_TODOLISTS', todolists}) as const;

//thunk-creators
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
        await todolistAPI.updateTodolistTitle(title, id)
        dispatch(ChangeTodolistTitle(id, title))
    } catch (e) {
        console.log(e)
    }
}

//types
export type TodolistBLLType = TodoType & { filter: FilterType }
export type FilterType = "all" | "active" | "completed";
export type ActionType =
    ReturnType<typeof RemoveTodolist>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof ChangeTodolistTitle>
    | ReturnType<typeof ChangeTodolistFilter>
    | ReturnType<typeof SetTodolists>;