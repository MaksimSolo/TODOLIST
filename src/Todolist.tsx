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

    const tasksJSX = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
        }
        const onClickHandler = () => {
            props.removeTask(props.todolistID, t.id)
        }
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ''}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x
                </button>
            </li>
        )
    })

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskTDL()
        }
    }

    const addTaskTDL = () => {
        if (newTaskTitle.trim()) {
            props.addTask(props.todolistID, newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed")

    const errorClass = error ? 'error' : "";
    const errorMessage = error ? 'Error! Typing is expected' : '';

    return (
        <div>
            <h3>{props.title}
            <button onClick={()=>props.removeTodolist(props.todolistID)}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={errorClass}
                />
                <button onClick={addTaskTDL}>+</button>
                <div className='error-message'>{errorMessage}</div>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}