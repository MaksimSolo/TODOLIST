import {instance} from "app/api/config/config";
import {TodoType, UpdateTodoTitle} from "app/api/todolists/todolists.api.types";
import {BaseResponseType,} from "common/types/types";

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<TodoType[]>('/todo-lists/');
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponseType<{ item: TodoType }>>('/todo-lists/', {title});
  },
  deleteTodolist: (id: string) => {
    return instance.delete<BaseResponseType>(`/todo-lists/${id}`);
  },
  updateTodolistTitle: (arg: UpdateTodoTitle) => {
    return instance.put<BaseResponseType>(`/todo-lists/${arg.id}`, {title: arg.title});
  },
}