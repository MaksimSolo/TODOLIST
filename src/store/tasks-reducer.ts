import {AddTodolist, clearStateData, RemoveTodolist, SetTodolists} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskApiModel} from "../api/task-api";
import {AppStateType, AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todolistID]: action.tasks.map(t => ({...t, taskItemStatus: 'idle'}))}
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}
        case 'ADD-TASK': {
            const copyState = {...state}
            let tasks = {...state}[action.task.todoListId]
            const newBLLTypeTask: TaskBLLType = {...action.task, taskItemStatus: 'idle'}
            copyState[action.task.todoListId] = [newBLLTypeTask, ...tasks]
            return copyState;
        }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    ...action.changesForApiModel
                } : t)
            }
        case "CHANGE-TASK-ITEM-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    taskItemStatus: action.taskItemStatus
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE_TODOLIST":
            const copyTasks = {...state}
            delete copyTasks[action.id]
            return (copyTasks)
        //также с помощью Рест-оператора
        //const {[action.id]:[], ... rest}={...tasks}
        //return rest
        case "SET_TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'CLEAR-STATE-DATA':
            return {}
        default:
            return state
    }
}

//action-creators
export const removeTaskAC = (todolistID: string, id: string,) => ({type: 'REMOVE-TASK', todolistID, id,} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task,} as const)
export const updateTaskAC = (todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel) =>
    ({type: 'UPDATE_TASK', taskID, todolistID, changesForApiModel,} as const)
export const setTasksAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: 'SET_TASKS', todolistID, tasks} as const)
export const changeTaskItemStatus = (todolistID: string, taskID: string, taskItemStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ITEM-STATUS', todolistID, taskID, taskItemStatus} as const)

//thunk-creators
export const fetchTasksTC = (todolistID: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistID)
        .then(resp => {
            dispatch(setTasksAC(todolistID, resp.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            const error = err as AxiosError
            handleServerNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (todolistID: string, taskID: string,): AppThunk => dispatch => {
    dispatch(changeTaskItemStatus(todolistID, taskID, 'loading'))
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(removeTaskAC(todolistID, taskID))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskItemStatus(todolistID, taskID, 'succeeded'))
        })
        .catch(err => {
            const error = err as AxiosError
            handleServerNetworkError(dispatch, error.message)
        })
}
export const addTaskTC = (todolistID: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        let resp = await tasksAPI.createTask(todolistID, title)
        if (resp.data.resultCode === 0) {
            dispatch(addTaskAC(resp.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, resp.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(dispatch, error.message)
    }
}
export const updateTaskTC = (todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel): AppThunk =>
    async (dispatch, getState: () => AppStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
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
                dispatch(updateTaskAC(todolistID, taskID, changesForApiModel))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, resp.data)
            }
        } catch (err) {
            const error = err as AxiosError
            handleServerNetworkError(dispatch, error.message)
        }
    }

//types
export type TasksStateType = { [key: string]: Array<TaskBLLType> }
export type TaskBLLType = TaskType & {
    taskItemStatus: RequestStatusType
}
export type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof RemoveTodolist>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof SetTodolists>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskItemStatus>
    | ReturnType<typeof clearStateData>;

export type UpdateTaskUIModel = {
    deadline?: string,
    description?: string,
    priority?: TaskPriorities,
    startDate?: string,
    status?: TaskStatuses,
    title?: string,
}