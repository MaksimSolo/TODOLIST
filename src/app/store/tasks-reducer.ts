import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {authActions} from "app/store/auth-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "common/utils/error-utils";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskApiModel} from "../api/task-api";
import {TodoType} from "../api/todolist-api";
import {appActions, RequestStatusType} from "./app-reducer";
import {AppStateType, AppThunk} from "./store";
import {todosActions} from "./todolists-reducer";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'TASK',
  initialState,
  reducers: {
    setTasks: (state: TasksStateType, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) => {
      state[action.payload.todolistID] = action.payload.tasks.map(t => ({
        ...t,
        taskItemStatus: 'idle' as RequestStatusType
      }))
    },
    removeTask: (state: TasksStateType, action: PayloadAction<{ todolistID: string, id: string }>) => {
      const index = state[action.payload.todolistID].findIndex(({id}) => id === action.payload.id)
      if (index > -1) {
        state[action.payload.todolistID].splice(index, 1)
      }
    },
    addTask: (state: TasksStateType, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift({...action.payload.task, taskItemStatus: 'idle'})
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

export const tasksReducer: Reducer<TasksStateType, ActionsType> = slice.reducer

export const tasksActions = slice.actions


//thunk-creators
export const fetchTasksTC = (todolistID: string): AppThunk => dispatch => {
  dispatch(appActions.setAppStatus({status: 'loading'}))
  tasksAPI.getTasks(todolistID)
    .then(resp => {
      dispatch(tasksActions.setTasks({todolistID, tasks: resp.data.items}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    })
    .catch(err => {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    })
}
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
export const addTaskTC = (todolistID: string, title: string): AppThunk => async dispatch => {
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    let resp = await tasksAPI.createTask(todolistID, title)
    if (resp.data.resultCode === 0) {
      dispatch(tasksActions.addTask({task: resp.data.data.item}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
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
    } catch (err) {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    }
  }

//types
// export type TasksStateType = { [key: string]: Array<TaskBLLType> }
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
  | PayloadAction<{}>

export type UpdateTaskUIModel = {
  deadline?: string,
  description?: string,
  priority?: TaskPriorities,
  startDate?: string,
  status?: TaskStatuses,
  title?: string,
}