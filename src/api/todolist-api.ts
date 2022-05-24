import axios from "axios";

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type BaseResponseType<T = {} > = {
    resultCode: number
    messages: string[],
    data: T
    fieldsErrors: string[]
}

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


export const todolistAPI = {
    getTodolists: () => {
        return instance.get<Array<TodoType>>('');
    },
    createTodolist: (title: string) => {
        return instance.post<BaseResponseType<{ item: TodoType }>>('', {title});
    },
    deleteTodolist: (id: string) => {
        return instance.delete<BaseResponseType>(`${id}`);
    },
    updateTodolistTitle: (title: string, id: string) => {
        return instance.put<BaseResponseType>(`${id}`, {title});
    },
}