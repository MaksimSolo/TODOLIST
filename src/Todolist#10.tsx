import React, {ChangeEvent} from "react";
import {FilterType, TasksStateType, TaskType, TodolistsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist} from "./store/todolists-reducer";


type PropsType = {

    todolistID: string

}

export function Todolist10(props: PropsType) {

    const dispatch = useDispatch();
    const todolist = useSelector<AppStateType, TodolistsType>(state => state.todolists.filter(tl=>tl.id===props.todolistID)[0])
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const tasksForRender = (filter: FilterType, tasks: Array<TaskType>) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const itemFontStyles = {fontWeight: 'bold'}

    const tasksJSX = tasksForRender(todolist.filter, tasks).map(t => {
        const getClasses = () => t.isDone ? "is-done" : ''
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(props.todolistID, t.id, e.currentTarget.checked));
        }
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(props.todolistID, t.id, title))
        }
        const removeTask = () => {
            dispatch(removeTaskAC(props.todolistID, t.id));
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
    const addTaskTDL = (newTaskTitle: string) => dispatch(addTaskAC(props.todolistID, newTaskTitle))
    const changeTodoTitle = (title: string) => {
        dispatch(ChangeTodolistTitle(props.todolistID, title));
    }

    const onAllFilter = () => dispatch(ChangeTodolistFilter(props.todolistID, "all"))
    const onActiveFilter = () => dispatch(ChangeTodolistFilter(props.todolistID, "active"))
    const onCompletedFilter = () => dispatch(ChangeTodolistFilter(props.todolistID, "completed"))

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <Typography
            variant={'h5'}
            align={'center'}
            style={{fontWeight:'bold'}}>
                <EditableSpan title={todolist.title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={() => dispatch(RemoveTodolist(props.todolistID))}>
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
                        color={todolist.filter === "all" ? 'secondary' : "primary"}
                        onClick={onAllFilter}>All
                    </Button>
                    <Button
                        color={todolist.filter === "active" ? 'secondary' : "primary"}
                        onClick={onActiveFilter}>Active
                    </Button>
                    <Button
                        color={todolist.filter === "completed" ? 'secondary' : "primary"}
                        onClick={onCompletedFilter}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}