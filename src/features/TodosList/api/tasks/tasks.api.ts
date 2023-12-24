import {instance} from "common/api-config/api-config";
import {
  AddTask,
  BaseTasksRespType,
  GetTaskResponseType,
  RemoveTask,
  UpdateTaskApiModel
} from "features/TodosList/api/tasks/tasks.api.types";

//api
export const tasksAPI = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`,);
  },
  createTask: (arg: AddTask) => {
    return instance.post<BaseTasksRespType>(`/todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
  },
  deleteTask: (arg: RemoveTask) => {
    return instance.delete<BaseTasksRespType<{}>>(`/todo-lists/${arg.todolistID}/tasks/${arg.taskID}`);
  },
  updateTask: (todolistId: string, id: string, model: UpdateTaskApiModel) => {
    return instance.put<BaseTasksRespType>(`/todo-lists/${todolistId}/tasks/${id}`, model);
  },
}

