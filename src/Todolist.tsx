import React, {ChangeEvent, MouseEventHandler} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, val: FilterType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterType
    todolistID: string
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTodoTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskTDL = (newTaskTitle: string) => props.addTask(props.todolistID, newTaskTitle)
    const changeTodoTitle = (title: string) => {
        props.changeTodoTitle(props.todolistID, title)
    }

    const onAllFilter = () => props.changeFilter(props.todolistID, "all")
    const onActiveFilter = () => props.changeFilter(props.todolistID, "active")
    const onCompletedFilter = () => props.changeFilter(props.todolistID, "completed")
    const getBtnClass = (filter: FilterType) => props.filter === filter ? "active-filter" : ''

    const tasksJSX = props.tasks.map(t => {
        const getClasses = () => t.isDone ? "is-done" : ''
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todolistID, t.id, title)
        }
        const removeTask = () => {
            props.removeTask(props.todolistID, t.id)
        }
        return (
            <li key={t.id} className={getClasses()}>
                <input type="checkbox"
                       onChange={changeStatus}
                       checked={t.isDone}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
                <button onClick={() => props.removeTodolist(props.todolistID)}>x</button>
            </h3>
            <AddItemForm addItem={addTaskTDL}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={getBtnClass('all')}
                        onClick={onAllFilter}>All
                </button>
                <button className={getBtnClass('active')}
                        onClick={onActiveFilter}>Active
                </button>
                <button className={getBtnClass('completed')}
                        onClick={onCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}