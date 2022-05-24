import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./todolist-api";

export default {
    title: 'API/Todolists'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists().then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = 'New Maksim!!!'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then((resp) => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "d69afb23-7187-48d4-9fb5-2d1e0d659195"
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((resp) => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let newTitle = 'YOOOOOO!!!!!'
    let todolistId = "ab96b91f-147c-46e0-b676-0309b0c250e7"
    useEffect(() => {
        todolistAPI.updateTodolistTitle(newTitle, todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


