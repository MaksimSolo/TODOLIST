import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    isDone: boolean,
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
export const tasksReducer = (tasks: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return ({...tasks, [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.id)})
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return ({...tasks, [action.todolistID]: [newTask, ...tasks[action.todolistID]]})
        case 'CHANGE-TASK-STATUS':
            return ({
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            })
        case 'CHANGE-TASK-TITLE':
            return ({
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            })
        case "ADD-TODOLIST":
            return ({...tasks, [action.id]: []})
        case "REMOVE_TODOLIST":
            const copyTasks = {...tasks}
            delete copyTasks[action.id]
            return (copyTasks)
        //также с помощью Рест-оператора
        //const {[action.id]:[], ... rest}={...tasks}
        //return rest

        default:
            throw new Error('I dont understand this type')
    }
}

export const removeTaskAC = (id: string, todolistID: string): removeTaskAT => ({type: 'REMOVE-TASK', id, todolistID})
export const addTaskAC = (title: string, todolistID: string): addTaskAT => ({type: 'ADD-TASK', title, todolistID})
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean,): changeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    taskID,
    isDone,
    todolistID
})
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    taskID,
    title,
    todolistID
})

