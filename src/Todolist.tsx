import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";


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

    const itemFontStyles = {fontWeight: 'bold'}
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
            <ListItem key={t.id}
                      className={getClasses()}
                      divider
                      disableGutters
                      style={{display: "flex", justifyContent: 'space-between'}}>

                <div style={itemFontStyles}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        onChange={changeStatus}
                        checked={t.isDone}
                        style={{marginRight: '15px'}}
                    />
                    {t.isDone
                        ? <span>{t.title}</span>
                        : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>}
                </div>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </ListItem>
        )
    })
    const addTaskTDL = (newTaskTitle: string) => props.addTask(props.todolistID, newTaskTitle)
    const changeTodoTitle = (title: string) => {
        props.changeTodoTitle(props.todolistID, title)
    }

    const onAllFilter = () => props.changeFilter(props.todolistID, "all")
    const onActiveFilter = () => props.changeFilter(props.todolistID, "active")
    const onCompletedFilter = () => props.changeFilter(props.todolistID, "completed")

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <Typography
            variant={'h5'}
            align={'center'}
            style={{fontWeight:'bold'}}>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.todolistID)}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskTDL}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={'small'}
                    fullWidth
                >
                    <Button
                        color={props.filter === "all" ? 'secondary' : "primary"}
                        onClick={onAllFilter}>All
                    </Button>
                    <Button
                        color={props.filter === "active" ? 'secondary' : "primary"}
                        onClick={onActiveFilter}>Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? 'secondary' : "primary"}
                        onClick={onCompletedFilter}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}