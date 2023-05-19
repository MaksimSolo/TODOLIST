import {instance} from "app/api/config/config";
import {LoginParamsType} from "common/types/types";


export const todolistAPI = {
  getTodolists: () => {
    return instance.get<Array<TodoType>>('/todo-lists/');
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponseType<{ item: TodoType }>>('/todo-lists/', {title});
  },
  deleteTodolist: (id: string) => {
    return instance.delete<BaseResponseType>(`/todo-lists/${id}`);
  },
  updateTodolistTitle: (title: string, id: string) => {
    return instance.put<BaseResponseType>(`/todo-lists/${id}`, {title});
  },
}

export const authAPI = {
  login: (loginParams: LoginParamsType) => {
    return instance.post<BaseResponseType<{ userId: number }>>('/auth/login', loginParams);
  },
  me: () => {
    return instance.get<BaseResponseType>('/auth/me',)
  },
  logout: () => {
    return instance.delete<BaseResponseType>('/auth/login')
  }
}


//types
export type TodoType = {
  addedDate: string
  id: string
  order: number
  title: string
}
export type BaseResponseType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
  fieldsErrors: string[]
}
