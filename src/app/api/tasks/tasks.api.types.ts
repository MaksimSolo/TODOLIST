export interface AddTask {
  todolistId: string,
  title: string
}

export interface UpdateTask {
  todolistID: string,
  taskID: string,
  changesForApiModel: UpdateTaskUIModel
}

export type UpdateTaskUIModel = {
  deadline?: string,
  description?: string,
  priority?: TaskPriorities,
  startDate?: string,
  status?: TaskStatuses,
  title?: string,
}

export interface RemoveTask {
  todolistID: string,
  taskID: string
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
export type GetTaskResponseType = {
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