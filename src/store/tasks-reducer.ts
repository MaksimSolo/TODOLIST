import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskApiModel} from "../api/task-api";
import {AppStateType, AppThunk} from "./store";

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistID: string
    id: string
}
type addTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}
type updateTaskAT = {
    type: 'UPDATE_TASK'
    todolistID: string
    taskID: string,
    changesForApiModel: UpdateTaskUIModel
}

type SetTasksAT = {
    type: 'SET_TASKS'
    todolistID: string
    tasks: TaskType[]
}

export type ActionsType =
    removeTaskAT
    | addTaskAT
    | updateTaskAT
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsAT
    | SetTasksAT;


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todolistID]: action.tasks}
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}
        case 'ADD-TASK': {
            const copyState = {...state}
            let tasks = {...state}[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            copyState[action.task.todoListId] = newTasks
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

        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, id: string,): removeTaskAT => ({type: 'REMOVE-TASK', todolistID, id,})
export const addTaskAC = (task: TaskType): addTaskAT => ({type: 'ADD-TASK', task,})
export const updateTaskAC = (todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel): updateTaskAT => ({
    type: 'UPDATE_TASK',
    taskID,
    todolistID,
    changesForApiModel,
})
export const setTasksAC = (todolistID: string, tasks: TaskType[]): SetTasksAT => ({
    type: 'SET_TASKS',
    todolistID,
    tasks
})

export const fetchTasksTC = (todolistID: string): AppThunk => {
    return (dispatch) => {
        tasksAPI.getTasks(todolistID).then(resp => dispatch(setTasksAC(todolistID, resp.data.items)))
    }
}
export const removeTaskTC = (todolistID: string, taskID: string,): AppThunk => {
    return (dispatch) => {
        tasksAPI.deleteTask(todolistID, taskID).then(() => dispatch(removeTaskAC(todolistID, taskID)))
    }
}
export const addTaskTC = (todolistID: string, title: string): AppThunk => {
    return (dispatch) => {
        tasksAPI.createTask(todolistID, title).then(resp => dispatch(addTaskAC(resp.data.data.item)))
    }
}


export type UpdateTaskUIModel = {
    deadline?: string,
    description?: string,
    priority?: TaskPriorities,
    startDate?: string,
    status?: TaskStatuses,
    title?: string,
}
export const updateTaskTC = (todolistID: string, taskID: string, changesForApiModel: UpdateTaskUIModel): AppThunk => {
    return (dispatch, getState: () => AppStateType) => {
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

        tasksAPI.updateTask(todolistID, taskID, apiModel).then(() => {
            dispatch(updateTaskAC(todolistID, taskID, changesForApiModel))
        })
    }
}