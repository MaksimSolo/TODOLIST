import {TaskStatuses, TaskType} from "features/TodosList/api/tasks/tasks.api.types";
import {Task} from "features/TodosList/ui/TodoList/Tasks/Task/Task";
import {TasksStateType} from "features/TodosList/model/tasks/slice/tasksSlice";
import {FilterType, TodolistBLLType} from "features/TodosList/model/todolists/slice/todolistsSlice";
import * as taskSelectors from "features/TodosList/model/tasks/selectors/task.selectors";
import {useAppSelector} from "app/store/store";
import { memo, ReactElement, useMemo } from 'react';


type Props = {
  todolist: TodolistBLLType
}

export const Tasks = memo(({todolist}: Props): ReactElement => {

  const tasks = useAppSelector<TasksStateType>(taskSelectors.tasks)[todolist.id]

  const tasksForRender = (filter: FilterType, tasks: TaskType[]) => {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.status === TaskStatuses.Completed)
      case "active":
        return tasks.filter(t => t.status !== TaskStatuses.Completed)
      default:
        return tasks
    }
  }

  const tasksJSX = useMemo(() => tasksForRender(todolist.filter, tasks)
    .map(t => <Task
      key={t.id}
      todolistID={t.todoListId}
      taskID={t.id}/>), [tasks, todolist.filter]);

  return (
    <ul>
      {tasksJSX}
    </ul>
  );
});