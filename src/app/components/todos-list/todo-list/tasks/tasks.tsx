import {TaskStatuses, TaskType} from "app/api/tasks/tasks.api.types";
import {Task} from "app/components/todos-list/todo-list/tasks/task/task";
import {TasksStateType} from "app/store/reducers/tasks-reducer";
import {FilterType, TodolistBLLType} from "app/store/reducers/todolists-reducer";
import * as taskSelectors from "app/store/selectors/task.selectors";
import {useAppSelector} from "app/store/store";
import React, {FC, memo, useMemo} from 'react';


type Props = {
  todolist: TodolistBLLType
}

export const Tasks: FC<Props> = memo(({todolist}) => {

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