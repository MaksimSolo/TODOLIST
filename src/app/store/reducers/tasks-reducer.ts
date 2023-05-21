import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddTaskArgType, TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskApiModel} from "app/api/task-api";
import {TodoType} from "app/api/todolist-api";
import {appActions, RequestStatusType} from "app/store/reducers/app-reducer";
import {authActions} from "app/store/reducers/auth-reducer";
import {todosActions} from "app/store/reducers/todolists-reducer";
import {AppStateType, AppThunk} from "app/store/store";
import {AxiosError} from "axios";
import {createAppAsyncThunk} from "common/utils/app-async-thunk";
import {handleServerAppError, handleServerNetworkError} from "common/utils/error-utils";

const fetchTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string>(
  'TASK/fetchTasks', async (todolistID, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await tasksAPI.getTasks(todolistID)
      return {todolistID, tasks: resp.data.items}
    }
    catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
    finally {
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
  })

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  'TASK/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const resp = await tasksAPI.createTask(arg)
      if (resp.data.resultCode === 0) {
        return {task: resp.data.data.item}
      } else {
        handleServerAppError(dispatch, resp.data)
        return rejectWithValue(null)
      }
    }
    catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
    finally {
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
  }
)

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'TASK',
  initialState,
  reducers: {
    removeTask: (state: TasksStateType, action: PayloadAction<{ todolistID: string, id: string }>) => {
      const index = state[action.payload.todolistID].findIndex(({id}) => id === action.payload.id)
      if (index > -1) {
        state[action.payload.todolistID].splice(index, 1)
      }
    },
    updateTask: (
      state: TasksStateType,
      action: PayloadAction<{ todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel }>
    ) => {
      const tasks = state[action.payload.todolistID]
      const index = tasks.findIndex(({id}) => id === action.payload.taskID)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.changesForApiModel}
      }
    },
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
      .addCase(todosActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todosActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todosActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach(({id}) => {
          state[id] = []
        })
      })
      .addCase(authActions.clearStateData, () => initialState);
  },
})

export const tasksReducer = slice.reducer

export const tasksActions = slice.actions

export const tasksThunks = {fetchTasks, addTask}


//thunk-creators

export const removeTaskTC = (todolistID: string, taskID: string,): AppThunk => dispatch => {
  dispatch(tasksActions.changeTaskItemStatus({todolistID, taskID, taskItemStatus: 'loading'}))
  dispatch(appActions.setAppStatus({status: 'loading'}))
  tasksAPI.deleteTask(todolistID, taskID)
    .then(() => {
      dispatch(tasksActions.removeTask({todolistID, id: taskID}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
      dispatch(tasksActions.changeTaskItemStatus({todolistID, taskID, taskItemStatus: 'succeeded'}))
    })
    .catch(err => {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    })
}

export const updateTaskTC = (todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel): AppThunk =>
  async (dispatch, getState: () => AppStateType) => {
    try {
      dispatch(appActions.setAppStatus({status: 'loading'}))
      const state = getState();
      const allTasksOfTodo = state.tasks[todolistID];
      const currentTask = allTasksOfTodo.find(t => t.id === taskID)
      if (!currentTask) {
        console.warn('Task not found in state!!??')
        return
      }

      const apiModel: UpdateTaskApiModel = {
        deadline: currentTask.deadline,
        description: currentTask.description,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        status: currentTask.status,
        title: currentTask.title,
        ...changesForApiModel
      }

      let resp = await tasksAPI.updateTask(todolistID, taskID, apiModel);
      if (resp.data.resultCode === 0) {
        dispatch(tasksActions.updateTask({todolistID, taskID, changesForApiModel}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(dispatch, resp.data)
      }
    }
    catch (err) {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    }
  }

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

export type UpdateTaskUIModel = {
  deadline?: string,
  description?: string,
  priority?: TaskPriorities,
  startDate?: string,
  status?: TaskStatuses,
  title?: string,
}