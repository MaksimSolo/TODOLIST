import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid"
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";
import {
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle,
    FilterType,
    RemoveTodolist,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/task-api";


//C-R-U-D
function AppWithReducers() {
//Business Logic Layer
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchInTodoReducer] = useReducer(todolistsReducer, [
        {
            id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ])
    let [tasks, dispatchInTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "Beer", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "Fish", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "Book", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
        ]
    });
    //tasks
    const removeTask = (id: string, todolistID: string) => {
        dispatchInTasksReducer(removeTaskAC(id, todolistID))
    }
    const addTask = (title: string, todolistID: string,) => {
        dispatchInTasksReducer(addTaskAC({
            addedDate: '',
            deadline: '',
            description: '',
            id: 'bla',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            title: title,
            todoListId: todolistID
        }))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses,) => {
        dispatchInTasksReducer(updateTaskAC(todolistID, taskID, {status},))
    }
    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        dispatchInTasksReducer(updateTaskAC(todolistID, taskID, {title}, ))
    }
    //todolists
    const changeTodoFilter = (todolistID: string, val: FilterType) => {
        dispatchInTodoReducer(ChangeTodolistFilter(todolistID, val))
    }
    const changeTodoTitle = (todolistID: string, title: string) => {
        dispatchInTodoReducer(ChangeTodolistTitle(todolistID, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchInTodoReducer(RemoveTodolist(todolistID))
        dispatchInTasksReducer(RemoveTodolist(todolistID))
    }
    const addTodolist = (newTodoTitle: string) => {
        dispatchInTodoReducer(AddTodolist({
            addedDate: '',
            id: '',
            order: 0,
            title: newTodoTitle,
        }))
        dispatchInTasksReducer(AddTodolist({
            addedDate: '',
            id: '',
            order: 0,
            title: newTodoTitle,
        }))
    }

    const getTasksForRender = (filter: FilterType, tasks: Array<TaskType>) => {
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


export default AppWithReducers;
