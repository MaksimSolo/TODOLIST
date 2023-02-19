import {AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {todolistAPI, TodoType} from "../api/todolist-api";

const initialState: Array<TodolistBLLType> = [];

export const todolistsReducer = (state: Array<TodolistBLLType> = initialState, action: ActionType): Array<TodolistBLLType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      const newTodo = action.todolist;
      const resultTodo: TodolistBLLType = {...newTodo, filter: 'all', entityStatus: 'idle'}
      return [resultTodo, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET_TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
    case 'CLEAR-STATE-DATA':
      return []
    default:
      return state
  }
}

//action-creators
export const RemoveTodolist = (id: string) => ({type: 'REMOVE_TODOLIST', id} as const)
export const AddTodolist = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist,} as const)
export const ChangeTodolistTitle = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const ChangeTodolistFilter = (id: string, filter: FilterType) =>
  ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const SetTodolists = (todolists: Array<TodoType>) => ({type: 'SET_TODOLISTS', todolists} as const);
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
  type: 'CHANGE-TODOLIST-ENTITY-STATUS',
  id,
  entityStatus
} as const)
export const clearStateData = () => ({type: 'CLEAR-STATE-DATA',} as const)

//thunk-creators
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatusAC('loading'))
    const resp = await todolistAPI.getTodolists()
    dispatch(SetTodolists(resp.data))
    resp.data.forEach(tl => {
      dispatch(fetchTasksTC(tl.id))
    })
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    dispatch(setAppStatusAC('loading'))
    await todolistAPI.deleteTodolist(id)
    dispatch(RemoveTodolist(id))
    dispatch(setAppStatusAC('succeeded'))
    dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatusAC('loading'))
    let resp = await todolistAPI.createTodolist(title);
    if (resp.data.resultCode === 0) {
      dispatch(AddTodolist(resp.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const updateTodolistTitleTC = (title: string, id: string): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatusAC('loading'))
    let resp = await todolistAPI.updateTodolistTitle(title, id)
    if (resp.data.resultCode === 0) {
      dispatch(ChangeTodolistTitle(id, title))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

//types
export type TodolistBLLType = TodoType & {
  filter: FilterType
  entityStatus: RequestStatusType
}
export type FilterType = "all" | "active" | "completed";
export type ActionType =
  ReturnType<typeof RemoveTodolist>
  | ReturnType<typeof AddTodolist>
  | ReturnType<typeof ChangeTodolistTitle>
  | ReturnType<typeof ChangeTodolistFilter>
  | ReturnType<typeof SetTodolists>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ReturnType<typeof clearStateData>;