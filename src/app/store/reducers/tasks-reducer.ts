import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksAPI} from "app/api/tasks/tasks.api";
import {
  AddTask,
  RemoveTask,
  TaskType,
  UpdateTask,
  UpdateTaskApiModel,
  UpdateTaskUIModel
} from "app/api/tasks/tasks.api.types";
import {TodoType} from "app/api/todolists/todolists.api.types";
import {appActions, RequestStatusType} from "app/store/reducers/app-reducer";
import {authActions} from "app/store/reducers/auth-reducer";
import {todosThunks} from "app/store/reducers/todolists-reducer";
import {ResultCode} from 'common/types/types'
import {createAppAsyncThunk, errorUtils} from 'common/utils'


const fetchTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string>(
  'TASK/fetchTasks', async (todolistID, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await tasksAPI.getTasks(todolistID)
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
      return {todolistID, tasks: resp.data.items}
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  }
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTask>(
  'TASK/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await tasksAPI.createTask(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {task: resp.data.data.item}
      } else {
        errorUtils.handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  }
)

const updateTask = createAppAsyncThunk<UpdateTask, UpdateTask>(
  'TASK/updateTask',
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))

      const state = getState()
      const allTasksOfTodo = state.tasks[arg.todolistID]
      const currentTask = allTasksOfTodo.find(({id}) => id === arg.taskID)

      if (!currentTask) {
        dispatch(appActions.setAppError({error: 'task not found in state!'}))
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskApiModel = {
        deadline: currentTask.deadline,
        description: currentTask.description,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        status: currentTask.status,
        title: currentTask.title,
        ...arg.changesForApiModel
      }

      let resp = await tasksAPI.updateTask(arg.todolistID, arg.taskID, apiModel);

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
  }
)

const removeTask = createAppAsyncThunk<RemoveTask, RemoveTask>('TASK/removeTask', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(
      tasksActions.changeTaskItemStatus({todolistID: arg.todolistID, taskID: arg.taskID, taskItemStatus: 'loading'}))
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await tasksAPI.deleteTask(arg)
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

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'TASK',
  initialState,
  reducers: {
    changeTaskItemStatus: (
      state: TasksStateType,
      action: PayloadAction<{ todolistID: string, taskID: string, taskItemStatus: RequestStatusType }>
    ) => {
      state[action.payload.todolistID].find(t => t.id === action.payload.taskID ? {
        ...t,
        taskItemStatus: action.payload.taskItemStatus
      } : t)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistID] = action.payload.tasks.map(t => ({
          ...t,
          taskItemStatus: 'idle' as RequestStatusType
        }))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({...action.payload.task, taskItemStatus: 'idle'})
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistID]
        const index = tasks.findIndex(({id}) => id === action.payload.taskID)
        if (index > -1) {
          tasks[index] = {...tasks[index], ...action.payload.changesForApiModel}
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistID].findIndex(({id}) => id === action.payload.taskID)
        if (index > -1) {
          state[action.payload.todolistID].splice(index, 1)
        }
      })
      .addCase(todosThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todosThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todosThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach(({id}) => {
          state[id] = []
        })
      })
      .addCase(authActions.clearStateData, () => initialState);
  },
})

export const tasksReducer = slice.reducer

export const tasksActions = slice.actions

export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask}

//types
export type TasksStateType = Record<string, TaskBLLType[]>
export type TaskBLLType = TaskType & {
  taskItemStatus: RequestStatusType
}
export type ActionsType =
  PayloadAction<{ todolistID: string, id: string }>
  | PayloadAction<{ task: TaskType }>
  | PayloadAction<{ todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel }>
  | PayloadAction<{ id: string }>
  | PayloadAction<{ todolist: TodoType }>
  | PayloadAction<{ todolists: TodoType[] }>
  | PayloadAction<{ todolistID: string, tasks: TaskType[] }>
  | PayloadAction<{ todolistID: string, taskID: string, taskItemStatus: RequestStatusType }>
  | ReturnType<typeof authActions.clearStateData>

