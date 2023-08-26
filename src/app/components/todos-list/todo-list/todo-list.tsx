import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {FilterTasksButtons} from "app/components/todos-list/todo-list/filter-tasks-buttons/filter-tasks-buttons";
import {Tasks} from "app/components/todos-list/todo-list/tasks/tasks";
import {TodoListTitle} from "app/components/todos-list/todo-list/todo-list-title/todo-list-title";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {TodolistBLLType, todosThunks} from "app/store/reducers/todolists-reducer";
import {useActions} from "common/hooks/useActions";
import React, {FC, useCallback} from "react";
import {AddItemForm} from "../../AddItemForm/AddItemForm";

type Props = {
  todolist: TodolistBLLType
}

export const Todolist: FC<Props> = React.memo(({todolist}) => {

  const {addTask} = useActions(tasksThunks)
  const {removeTodolist} = useActions(todosThunks)

  const addTaskTDL = useCallback(
    (newTaskTitle: string) => addTask({todolistId: todolist.id, title: newTaskTitle}),
    [addTask, todolist.id]
  );

  const removeTodo = () => removeTodolist(todolist.id)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      wordBreak: 'break-all', alignItems: 'center'
    }}>

      <section style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>

        <TodoListTitle todolist={todolist}/>
        <IconButton onClick={removeTodo} disabled={todolist.entityStatus === 'loading'}>
          <Delete/>
        </IconButton>
      </section>

      <AddItemForm addItem={addTaskTDL} disabled={todolist.entityStatus === 'loading'}/>
      <Tasks todolist={todolist}/>
      <FilterTasksButtons todolist={todolist}/>
    </div>
  )
});