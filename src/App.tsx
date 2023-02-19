import React, {useState} from 'react';
import './styles/App.css';
import {Todolist} from "./app/components/TodosList/Todolist10/Todolist";
import {v1} from "uuid"
import {AddItemForm} from "./app/components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";
import {TaskPriorities, TaskStatuses} from "./app/api/task-api";
import {FilterType, TodolistBLLType} from "./app/store/todolists-reducer";
import {TaskBLLType} from "./app/store/tasks-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskBLLType>
}

//C-R-U-D
function App() {
//Business Logic Layer
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistBLLType>>([
        {
            id: todolistID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '',
            order: 0
        },
        {
            id: todolistID2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '',
            order: 0
        },
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "Beer", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "Fish", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "Book", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
                taskItemStatus: 'idle',
            },
        ]
    });
    //tasks
    const removeTask = (todolistID: string, id: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask: TaskBLLType = {
            id: v1(), title: title, status: TaskStatuses.New, addedDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle',
        }
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyTasks)
    }
    const changeTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, status} : t)
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
        const newTodo: TodolistBLLType = {
            id: v1(),
            title: newTodoTitle,
            filter: 'all',
            addedDate: '',
            entityStatus: 'idle',
            order: 0,
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const getTasksForRender = (filter: FilterType, tasks: Array<TaskBLLType>) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case "active":
                return tasks.filter(t => t.status !== TaskStatuses.Completed)
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
                        entityStatus={tl.entityStatus}
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
                        <AddItemForm addItem={addTodolist} disabled={false}/>
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
