import {instance} from "common/api-config/api-config";
import {BaseResponseType,} from "common/types/types";
import {TodoType, UpdateTodoTitle} from "features/TodosList/api/todolists/todolists.api.types";

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