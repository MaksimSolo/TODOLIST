import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsApi,} from "app/api/todolists/todolists.api";
import {TodoType, UpdateTodoTitle} from "app/api/todolists/todolists.api.types";
import {RequestStatusType} from "app/store/reducers/app-reducer";
import {authActions} from "app/store/reducers/auth-reducer";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {ResultCode,} from "common/types/types";
import {createAppAsyncThunk} from 'common/utils'


const slice = createSlice({
  name: 'TODOLIST',
  initialState: [] as TodolistBLLType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>
    ) => {
      const index = state.findIndex(({id}) => id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodolists.fulfilled, (_, action) =>
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
      .addCase(authActions.clearStateData, () => [])
  }
})

// thunks

const fetchTodolists = createAppAsyncThunk<{ todolists: TodoType[] }, void>(
  `${slice.name}/fetchTodos`,
  async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      const resp = await todolistsApi.getTodolists()
      resp.data.forEach(tl => {
        dispatch(tasksThunks.fetchTasks(tl.id))
      })
      return {todolists: resp.data}
    }
    catch (error) {
      // errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  }
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/removeTodolist`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(todosActions.changeTodolistEntityStatus({id: arg, entityStatus: 'loading'}))
      const resp = await todolistsApi.deleteTodolist(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        return {id: arg}
      } else {
        // errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      // errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

const createTodolist = createAppAsyncThunk<{ todolist: TodoType }, string>(
  `${slice.name}/createTodolist`, async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
      const resp = await todolistsApi.createTodolist(arg);
      if (resp.data.resultCode === ResultCode.OK) {
        return {todolist: resp.data.data.item}
      } else {
        // errorUtils.handleServerAppError(dispatch, resp.data,)
        return rejectWithValue(resp.data)
      }
    }
    catch (error) {
      // errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

const updateTodolistTitle = createAppAsyncThunk<UpdateTodoTitle, UpdateTodoTitle>(
  `${slice.name}/updateTodolistTitle`, async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
      const resp = await todolistsApi.updateTodolistTitle(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        return arg
      } else {
        // errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      // errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  })

export const todolistsReducer = slice.reducer
export const todosActions = slice.actions
export const todosThunks = {fetchTodolists, removeTodolist, createTodolist, updateTodolistTitle}

//types
export type TodolistBLLType = TodoType & {
  filter: FilterType
  entityStatus: RequestStatusType
}
export type FilterType = "all" | "active" | "completed";
