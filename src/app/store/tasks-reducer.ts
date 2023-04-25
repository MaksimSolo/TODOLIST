import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskApiModel} from "../api/task-api";
import {AppStateType, AppThunk} from "./store";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {TodoType} from "../api/todolist-api";
import {addTodolist, clearStateData, removeTodolist, setTodolists} from "./todolists-reducer";

const initialState: TasksStateType = {};

const taskSlice = createSlice({
  name: 'TASK',
  initialState: initialState,
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
    addTask: (state: TasksStateType, action: PayloadAction<TaskType>) => {
      state[action.payload.todoListId].unshift({...action.payload, taskItemStatus: 'idle'})
    },
    updateTask: (
      state: TasksStateType,
      action: PayloadAction<{ todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel }>
    ) => {
      // state[action.payload.todolistID].find(t => t.id === action.payload.taskID ? {...t, ...action.payload.changesForApiModel} : '')
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
  extraReducers: (builder) => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.id] = []
    });
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.id]
    });
    builder.addCase(setTodolists, (state, action) => {
      action.payload.forEach(({id}) => {
        state[id] = []
      })
    });
    builder.addCase(clearStateData, () => {
      return initialState
    });
  },
})

export const tasksReducer: Reducer<TasksStateType, ActionsType> = taskSlice.reducer

export const {
  setTasks,
  removeTask,
  addTask,
  updateTask,
  changeTaskItemStatus,
} = taskSlice.actions

//thunk-creators
export const fetchTasksTC = (todolistID: string): AppThunk => dispatch => {
  dispatch(setAppStatus('loading'))
  tasksAPI.getTasks(todolistID)
    .then(resp => {
      dispatch(setTasks({todolistID, tasks: resp.data.items}))
      dispatch(setAppStatus('succeeded'))
    })
    .catch(err => {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    })
}
export const removeTaskTC = (todolistID: string, taskID: string,): AppThunk => dispatch => {
  dispatch(changeTaskItemStatus({todolistID, taskID, taskItemStatus: 'loading'}))
  dispatch(setAppStatus('loading'))
  tasksAPI.deleteTask(todolistID, taskID)
    .then(() => {
      dispatch(removeTask({todolistID, id: taskID}))
      dispatch(setAppStatus('succeeded'))
      dispatch(changeTaskItemStatus({todolistID, taskID, taskItemStatus: 'succeeded'}))
    })
    .catch(err => {
      const error = err as AxiosError
      handleServerNetworkError(dispatch, error)
    })
}
export const addTaskTC = (todolistID: string, title: string): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('loading'))
    let resp = await tasksAPI.createTask(todolistID, title)
    if (resp.data.resultCode === 0) {
      dispatch(addTask(resp.data.data.item))
      dispatch(setAppStatus('succeeded'))
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
      dispatch(setAppStatus('loading'))
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
        dispatch(updateTask({todolistID, taskID, changesForApiModel}))
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
// export type TasksStateType = { [key: string]: Array<TaskBLLType> }
export type TasksStateType = Record<string, TaskBLLType[]>
export type TaskBLLType = TaskType & {
  taskItemStatus: RequestStatusType
}
export type ActionsType =
  PayloadAction<{ todolistID: string, id: string }>
  | PayloadAction<TaskType>
  | PayloadAction<{ todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel }>
  | PayloadAction<string>
  | PayloadAction<TodoType>
  | PayloadAction<TodoType[]>
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