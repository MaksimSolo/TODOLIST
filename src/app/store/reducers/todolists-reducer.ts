import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {todolistApi, UpdateTodoTitle} from "app/api/todolist.api";
import {appActions, RequestStatusType} from "app/store/reducers/app-reducer";
import {authActions} from "app/store/reducers/auth-reducer";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {ResultCode, TodoType} from "common/types/types";
import {createAppAsyncThunk, errorUtils} from 'common/utils'


const fetchTodolists = createAppAsyncThunk<{ todolists: TodoType[] }, void>('TODOS/FETCH', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await todolistApi.getTodolists()
    resp.data.forEach(tl => {
      dispatch(tasksThunks.fetchTasks(tl.id))
    })
    dispatch(appActions.setAppStatus({status: 'succeeded'}))
    return {todolists: resp.data}
  }
  catch (error) {
    errorUtils.handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  'TODOS/removeTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(todosActions.changeTodolistEntityStatus({id: arg, entityStatus: 'loading'}))
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await todolistApi.deleteTodolist(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {id: arg}
      } else {
        errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

const createTodolist = createAppAsyncThunk<{ todolist: TodoType }, string>(
  'TODOS/createTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await todolistApi.createTodolist(arg);
      if (resp.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolist: resp.data.data.item}
      } else {
        errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

const updateTodolistTitle = createAppAsyncThunk<UpdateTodoTitle, UpdateTodoTitle>(
  'TODOS/updateTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await todolistApi.updateTodolistTitle(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return arg
      } else {
        errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

const initialState: TodolistBLLType[] = [];

const slice = createSlice({
  name: 'TODOLIST',
  initialState,
  reducers: {
    changeTodolistFilter: (state: TodolistBLLType[], action: PayloadAction<{ id: string, filter: FilterType }>) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state: TodolistBLLType[],
      action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>
    ) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) =>
        action.payload.todolists.map(tl => ({
          ...tl,
          filter: 'all' as FilterType,
          entityStatus: 'idle' as RequestStatusType
        })))
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(({id}) => id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(({id}) => id === action.payload.id)
        state[index].title = action.payload.title
      })
      .addCase(authActions.clearStateData, () => initialState)
})


export const todolistsReducer: Reducer<TodolistBLLType[], ActionType> = slice.reducer

export const todosActions = slice.actions

export const todosThunks = {fetchTodolists, removeTodolist, createTodolist, updateTodolistTitle}

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
  | ReturnType<typeof authActions.clearStateData>