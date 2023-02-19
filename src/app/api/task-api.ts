import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    'api-key': 'b42e249f-81b0-486e-a39f-c56668ce792c'
  }
}
const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists', ...settings,})

//api
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

//types
export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later
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
export type BaseTasksRespType<D = { item: TaskType }> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors?: string[]
}

