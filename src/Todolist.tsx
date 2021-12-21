import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";


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
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addTaskTDL = () => {
        if (newTaskTitle.trim()) {
            props.addTask(props.todolistID, newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskTDL()
        }
    }

    const onAllFilter = () => props.changeFilter(props.todolistID, "all")
    const onActiveFilter = () => props.changeFilter(props.todolistID, "active")
    const onCompletedFilter = () => props.changeFilter(props.todolistID, "completed")
    const getBtnClass = (filter: FilterType) => props.filter === filter ? "active-filter" : ''

    const errorClass = error ? 'error' : "";
    const errorMessage = error ? 'Error! Typing is expected' : '';

    const tasksJSX = props.tasks.map(t => {
        const getClasses = () => t.isDone ? "is-done" : ''
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
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
                <span>{t.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todolistID)}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={errorClass}
                />
                <button onClick={addTaskTDL}>+</button>
                <div className='error-message'>{errorMessage}</div>
            </div>
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