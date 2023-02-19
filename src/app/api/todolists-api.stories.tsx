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
    const [title, setTitle] = useState<string>('')

    const createTodo = () => {
        todolistAPI.createTodolist(title)
            .then((resp) => {
                setState(resp.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={createTodo}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const delTodo = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((resp) => {
                setState(resp.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(event => {
                       setTodolistId(event.currentTarget.value)
                   })}
            />
            <button onClick={delTodo}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodo = () => {
        todolistAPI.updateTodolistTitle(newTitle, todolistId)
            .then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'new title'}
                   value={newTitle}
                   onChange={event => {
                       setNewTitle(event.currentTarget.value)
                   }}
            />
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={event => {
                       setTodolistId(event.currentTarget.value)
                   }}
            />
            <button onClick={updateTodo}>Update Todolist Title</button>
        </div>
    </div>
}


