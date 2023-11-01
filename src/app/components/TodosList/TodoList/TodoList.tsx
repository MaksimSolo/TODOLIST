import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {AddItemForm} from "app/components/AddItemForm/AddItemForm";
import {FilterTasksButtons} from "app/components/TodosList/TodoList/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "app/components/TodosList/TodoList/Tasks/Tasks";
import {TodoListTitle} from "app/components/TodosList/TodoList/TodoListTitle/TodoListTitle";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {TodolistBLLType, todosThunks} from "app/store/reducers/todolists-reducer";
import {useActions} from "common/hooks/useActions";
import React, {ReactElement, useCallback} from "react";

type Props = {
  todolist: TodolistBLLType
}

export const TodoList = React.memo(({todolist}: Props): ReactElement => {

  const {addTask} = useActions(tasksThunks)
  const {removeTodolist} = useActions(todosThunks)

  const addTaskTDL = useCallback(
    (newTaskTitle: string) => {
      return addTask({todolistId: todolist.id, title: newTaskTitle}).unwrap()
    },
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