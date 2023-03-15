import {AppThunk} from "./store";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {todolistAPI, TodoType} from "../api/todolist-api";
import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";

const initialState: TodolistBLLType[] = [];

const todolistSlice = createSlice({
  name: 'TODOLIST',
  initialState: initialState,
  reducers: {
    removeTodolist: (state: TodolistBLLType[], action: PayloadAction<string>) => {
      state.filter(({id}) => id !== action.payload)
    },
    addTodolist: (state: TodolistBLLType[], action: PayloadAction<TodoType>) => {
      state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitle: (state: TodolistBLLType[], action: PayloadAction<{ id: string, title: string }>) => {
      // state.find(tl=>tl.id === action.payload.id ? {...tl, title: action.payload.title}:'')
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].title = action.payload.title
    },
    changeTodolistFilter: (state: TodolistBLLType[], action: PayloadAction<{ id: string, filter: FilterType }>) => {
      // state.find(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : '')
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    setTodolists: (state: TodolistBLLType[], action: PayloadAction<TodoType[]>) => {
      return action.payload.forEach(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    },
    changeTodolistEntityStatus: (
      state: TodolistBLLType[],
      action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>
    ) => {
      // state.find(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.entityStatus} : '')
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
    clearStateData: (state: TodolistBLLType[], action: PayloadAction<{}>) => {
      return initialState
    },
  }
})


export const todolistsReducer: Reducer<TodolistBLLType[], ActionType> = todolistSlice.reducer

export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearStateData
} = todolistSlice.actions


//thunk-creators
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('loading'))
    const resp = await todolistAPI.getTodolists()
    dispatch(setTodolists(resp.data))
    resp.data.forEach(tl => {
      dispatch(fetchTasksTC(tl.id))
    })
    dispatch(setAppStatus('succeeded'))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(changeTodolistEntityStatus({id, entityStatus: 'loading'}))
    dispatch(setAppStatus('loading'))
    await todolistAPI.deleteTodolist(id)
    dispatch(removeTodolist(id))
    dispatch(setAppStatus('succeeded'))
    dispatch(changeTodolistEntityStatus({id, entityStatus: 'succeeded'}))
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('loading'))
    let resp = await todolistAPI.createTodolist(title);
    if (resp.data.resultCode === 0) {
      dispatch(addTodolist(resp.data.data.item))
      dispatch(setAppStatus('succeeded'))
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
    dispatch(setAppStatus('loading'))
    let resp = await todolistAPI.updateTodolistTitle(title, id)
    if (resp.data.resultCode === 0) {
      dispatch(changeTodolistTitle({id, title}))
      dispatch(setAppStatus('succeeded'))
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
  PayloadAction<string>
  | PayloadAction<TodoType>
  | PayloadAction<{ id: string, title: string }>
  | PayloadAction<{ id: string, filter: FilterType }>
  | PayloadAction<TodoType[]>
  | PayloadAction<{ id: string, entityStatus: RequestStatusType }>