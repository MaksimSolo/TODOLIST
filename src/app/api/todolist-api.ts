import {instance} from "app/api/config/config";
import {BaseResponseType, TodoType} from "common/types/types";

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