import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid"
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

//C-R-U-D
function App() {
//Business Logic Layer
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ]
    });
    //tasks
    const removeTask = (todolistID: string, id: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyTasks)
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks(copyTasks)
    }
    //todolists
    const changeTodoFilter = (todolistID: string, val: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: val} : tl))
    }
    const changeTodoTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: title} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        const copyTasks = {...tasks}
        delete copyTasks[todolistID]
        setTasks(copyTasks)
    }
    const addTodolist = (newTodoTitle: string) => {
        const newTodo: TodolistsType = {
            id: v1(),
            title: newTodoTitle,
            filter: 'all'
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
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


export default App;
