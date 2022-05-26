import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/task-api";

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistID: string
    id: string
}
type addTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string,
    status: TaskStatuses,
}
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string,
    title: string,
    todolistID: string
}

export type ActionsType =
    removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType;


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return ({...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)})
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''}
            return ({...state, [action.todolistID]: [newTask, ...state[action.todolistID]]})
        case 'CHANGE-TASK-STATUS':
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.status
                } : t)
            })
        case 'CHANGE-TASK-TITLE':

            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            })
        case "ADD-TODOLIST":
            return ({...state, [action.id]: []})
        case "REMOVE_TODOLIST":
            const copyTasks = {...state}
            delete copyTasks[action.id]
            return (copyTasks)
        //также с помощью Рест-оператора
        //const {[action.id]:[], ... rest}={...tasks}
        //return rest

        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, id: string,): removeTaskAT => ({type: 'REMOVE-TASK', todolistID, id,})
export const addTaskAC = (todolistID: string, title: string,): addTaskAT => ({type: 'ADD-TASK', todolistID, title,})
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses,): changeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    taskID,
    status,
    todolistID
})
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string,): changeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    todolistID,
    taskID,
    title,
})

