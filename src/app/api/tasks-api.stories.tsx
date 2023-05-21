import React, {useState} from 'react'
import {tasksAPI} from "./task-api";

export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    /* useEffect(() => {
         // здесь мы будем делать запрос и ответ закидывать в стейт.
         // который в виде строки будем отображать в div-ке
         let todolistId = "93ab309b-2cdd-46d8-8434-2d1609f95194"
         tasksAPI.getTasks(todolistId).then(resp => setState(resp.data.items))
     }, [])

     return <div> {JSON.stringify(state)}</div>*/

    const getTasksOfTodo = () => {
        tasksAPI.getTasks(todolistId).then(resp => setState(resp.data.items))
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
                   value={todolistId}/>
            <button onClick={getTasksOfTodo}>Get tasks of the todolist</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTaskForTodo = () => {
        tasksAPI.createTask({todolistId, title})
            .then((resp) => {
                setState(resp.data.data.item)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input type="text"
                   placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={createTaskForTodo}> Create Task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const delTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((resp) => {
                setState(resp.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={delTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const model = {
        deadline: '',
        description: "Changed",
        order: 0,
        priority: 1,
        startDate: '',
        status: 0,
        title: "Changed TASK comes!!!",
    }
    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data.data.item))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}


