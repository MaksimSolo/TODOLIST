import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./todolist-api";
import {tasksAPI} from "./task-api";
import {useTreeItem} from "@mui/lab";

export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = "93ab309b-2cdd-46d8-8434-2d1609f95194"
        tasksAPI.getTasks(todolistId).then(resp => setState(resp.data.items))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "93ab309b-2cdd-46d8-8434-2d1609f95194"
    let title = 'Awesome New TASK comes!!!'
    useEffect(() => {
        tasksAPI.createTask(todolistId, title)
            .then((resp) => {
                setState(resp.data.data.item)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    let taskId = "d58e6814-f330-4bb7-9647-eff15174863d"
    let todolistId = "93ab309b-2cdd-46d8-8434-2d1609f95194"
    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((resp) => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    let taskId = "1a948a07-f811-4d9a-bb64-4322cbe6a750"
    let todolistId = "93ab309b-2cdd-46d8-8434-2d1609f95194"
    const model = {
        deadline: '',
        description: "Changed",
        order: 0,
        priority: 1,
        startDate: '',
        status: 0,
        title: "Changed TASK comes!!!",
    }
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data.data.item))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


