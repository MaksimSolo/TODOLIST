import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";
import {AddTodolist, ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {TasksStateType, TodolistsType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed";

//C-R-U-D
function AppWithRedux() {
//Business Logic Layer


    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)


    //tasks
    const removeTask = (id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }
    const addTask = (title: string, todolistID: string,) => {
        dispatch(addTaskAC(title, todolistID,))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone,))
    }
    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }
    //todolists
    const changeTodoFilter = (todolistID: string, val: FilterType) => {
        dispatch(ChangeTodolistFilter(todolistID, val))
    }
    const changeTodoTitle = (todolistID: string, title: string) => {
        dispatch(ChangeTodolistTitle(todolistID, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolist(todolistID))
    }
    const addTodolist = (newTodoTitle: string) => {
        dispatch(AddTodolist(newTodoTitle))
    }

    const getTasksForRender = (filter: FilterType, tasks: Array<TaskType>) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const todolistForRender = todolists.map(tl => {
        const tasksForRender = getTasksForRender(tl.filter, tasks[tl.id]);
        return (
            <Grid item
                  key={tl.id}>
                <Paper elevation={20}
                       style={{padding: '15px', width: '300px', height: '400px'}}>
                    < Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeTodoFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoTitle={changeTodoTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    //UI:
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={'center'} style={{padding: '15px'}}>
                    <Grid item>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent={'center'}>
                    {todolistForRender}
                </Grid>
            </Container>
        </div>
    )
}


export default AppWithRedux;
