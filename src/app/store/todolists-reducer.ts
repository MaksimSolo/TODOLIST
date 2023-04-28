import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {authActions} from "app/store/auth-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "common/utils/error-utils";
import {todolistAPI, TodoType} from "../api/todolist-api";
import {appActions, RequestStatusType} from "./app-reducer";
import {AppThunk} from "./store";
import {fetchTasksTC} from "./tasks-reducer";

const initialState: TodolistBLLType[] = [];

const slice = createSlice({
  name: 'TODOLIST',
  initialState,
  reducers: {
    removeTodolist: (state: TodolistBLLType[], action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state: TodolistBLLType[], action: PayloadAction<{ todolist: TodoType }>) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitle: (state: TodolistBLLType[], action: PayloadAction<{ id: string, title: string }>) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].title = action.payload.title
    },
    changeTodolistFilter: (state: TodolistBLLType[], action: PayloadAction<{ id: string, filter: FilterType }>) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    setTodolists: (state: TodolistBLLType[], action: PayloadAction<{ todolists: TodoType[] }>) =>
      action.payload.todolists.map(tl => ({
        ...tl,
        filter: 'all' as FilterType,
        entityStatus: 'idle' as RequestStatusType
      })),
    changeTodolistEntityStatus: (
      state: TodolistBLLType[],
      action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>
    ) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: builder =>
    builder.addCase(authActions.clearStateData, () => initialState)
})


export const todolistsReducer: Reducer<TodolistBLLType[], ActionType> = slice.reducer

export const todosActions = slice.actions

//thunk-creators
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await todolistAPI.getTodolists()
    dispatch(todosActions.setTodolists({todolists: resp.data}))
    resp.data.forEach(tl => {
      dispatch(fetchTasksTC(tl.id))
    })
    dispatch(appActions.setAppStatus({status: 'succeeded'}))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(todosActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}))
    dispatch(appActions.setAppStatus({status: 'loading'}))
    await todolistAPI.deleteTodolist(id)
    dispatch(todosActions.removeTodolist({id}))
    dispatch(appActions.setAppStatus({status: 'succeeded'}))
    dispatch(todosActions.changeTodolistEntityStatus({id, entityStatus: 'succeeded'}))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    let resp = await todolistAPI.createTodolist(title);
    if (resp.data.resultCode === 0) {
      dispatch(todosActions.addTodolist({todolist: resp.data.data.item}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
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
    dispatch(appActions.setAppStatus({status: 'loading'}))
    let resp = await todolistAPI.updateTodolistTitle(title, id)
    if (resp.data.resultCode === 0) {
      dispatch(todosActions.changeTodolistTitle({id, title}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
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
  PayloadAction<{ id: string }>
  | PayloadAction<{ todolist: TodoType }>
  | PayloadAction<{ id: string, title: string }>
  | PayloadAction<{ id: string, filter: FilterType }>
  | PayloadAction<{ todolists: TodoType[] }>
  | PayloadAction<{ id: string, entityStatus: RequestStatusType }>