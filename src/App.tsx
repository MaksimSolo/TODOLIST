import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid"
import {AddItemForm} from "./AddItemForm";

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

function App() {
//Business Logic
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

    function removeTask(todolistID: string, id: string) {
        const copyState = {...tasks}
        copyState[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        setTasks(copyState)
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        const copyState = {...tasks}
        copyState[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyState)
    }

    function changeFilter(todolistID: string, val: FilterType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: val} : tl))
    }
    function changeTodoTitle(todolistID: string, title: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: title} : tl))
    }
    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        const copyState = {...tasks}
        copyState[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyState)
    }
    function changeTaskTitle(todolistID: string, taskID: string, title: string) {
        const copyState = {...tasks}
        copyState[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks(copyState)
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodo = (newTodoTitle: string) => {
        const newTodo: TodolistsType = {
            id: v1(),
            title: newTodoTitle,
            filter: 'all'
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const getTasksForRender = (tl: TodolistsType) => {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(task => !task.isDone)
            case "completed":
                return tasks[tl.id].filter(task => task.isDone)
            default:
                return tasks[tl.id]
        }
    }

    const todolistForRender = todolists.map(tl => {
        const tasksForRender = getTasksForRender(tl);
        return (
            < Todolist
                key={tl.id}
                todolistID={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
            />
        )
    })
    return (
        <div className="App">
            {todolistForRender}
            <AddItemForm addItem={addTodo}/>
        </div>
    )
}

export default App;
