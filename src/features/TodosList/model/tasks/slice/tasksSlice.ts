import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksAPI} from "features/TodosList/api/tasks/tasks.api";
import {AddTask, RemoveTask, TaskType, UpdateTask, UpdateTaskApiModel} from "features/TodosList/api/tasks/tasks.api.types";
import {appActions, RequestStatusType} from "app/model/slice/appSlice";
import {authActions} from "features/auth/model/slice/authSlice";
import {todosThunks} from "features/TodosList/model/todolists/slice/todolistsSlice";
import {ResultCode} from 'common/types/types'
import {createAppAsyncThunk, errorUtils} from 'common/utils'


const slice = createSlice({
  name: 'TASK',
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskItemStatus: (
      state,
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
      .addCase(authActions.clearStateData, () => ({}));
  },
})


// thunks

const fetchTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`, async (todolistID: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      const resp = await tasksAPI.getTasks(todolistID)
      return {todolistID, tasks: resp.data.items}
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  }
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTask>(
  `${slice.name}/addTask`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      const resp = await tasksAPI.createTask(arg)
      if (resp.data.resultCode === ResultCode.OK) {
        return {task: resp.data.data.item}
      } else {
        errorUtils.handleServerAppError(dispatch, resp.data,)
        return rejectWithValue(resp.data)
        // return rejectWithValue(null)
      }
    }
    catch (error) {
      errorUtils.handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  }
)

const updateTask = createAppAsyncThunk<UpdateTask, UpdateTask>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {

      const state = getState()
      const allTasksOfTodo = state.tasks[arg.todolistID]
      const currentTask = allTasksOfTodo.find(({id}) => id === arg.taskID)

      if (!currentTask) {
        dispatch(appActions.setAppError({error: 'Tasks not found in state!'}))
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

const removeTask = createAppAsyncThunk<RemoveTask, RemoveTask>(`${slice.name}/removeTask`, async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(
      tasksActions.changeTaskItemStatus({todolistID: arg.todolistID, taskID: arg.taskID, taskItemStatus: 'loading'}))
    const resp = await tasksAPI.deleteTask(arg)
    if (resp.data.resultCode === ResultCode.OK) {
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

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask}

//types
export type TasksStateType = Record<string, TaskBLLType[]>
export type TaskBLLType = TaskType & {
  taskItemStatus: RequestStatusType
}
