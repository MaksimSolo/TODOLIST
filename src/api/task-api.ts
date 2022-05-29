import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'e8f5aac1-49b6-4991-ad14-5794e579a911'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    ...settings,
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string,
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string

}

type GetTaskResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}

export type UpdateTaskApiModel = {
    deadline: string,
    description: string,
    priority: TaskPriorities,
    startDate: string,
    status: TaskStatuses,
    title: string,
}


type BaseTasksRespType<D = { item: TaskType }> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors?: string[]
}

export const tasksAPI = {
    getTasks: (todolistId: string) => {
        return instance.get<GetTaskResponseType>(`${todolistId}/tasks`,);
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<BaseTasksRespType>(`${todolistId}/tasks`, {title});
    },
    deleteTask: (todolistId: string, id: string) => {
        return instance.delete<BaseTasksRespType<{}>>(`${todolistId}/tasks/${id}`);
    },
    updateTask: (todolistId: string, id: string, model: UpdateTaskApiModel) => {
        return instance.put<BaseTasksRespType>(`${todolistId}/tasks/${id}`, model);
    },
}