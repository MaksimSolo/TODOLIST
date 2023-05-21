import {instance} from "app/api/config/config";
import {UpdateTaskUIModel} from "app/store/reducers/tasks-reducer";

//api
export const tasksAPI = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`,);
  },
  createTask: (arg: AddTask) => {
    return instance.post<BaseTasksRespType>(`/todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
  },
  deleteTask: (todolistId: string, id: string) => {
    return instance.delete<BaseTasksRespType<{}>>(`/todo-lists/${todolistId}/tasks/${id}`);
  },
  updateTask: (todolistId: string, id: string, model: UpdateTaskApiModel) => {
    return instance.put<BaseTasksRespType>(`/todo-lists/${todolistId}/tasks/${id}`, model);
  },
}

//types
export interface AddTask {
  todolistId: string,
  title: string
}

export interface UpdateTask {
  todolistID: string,
  taskID: string,
  changesForApiModel: UpdateTaskUIModel
}

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

