import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {FilterTasksButtons} from "features/TodosList/components/TodoList/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/TodosList/components/TodoList/Tasks/Tasks";
import {TodoListTitle} from "features/TodosList/components/TodoList/TodoListTitle/TodoListTitle";
import {tasksThunks} from "features/TodosList/reducers/tasks-reducer";
import {TodolistBLLType, todosThunks} from "features/TodosList/reducers/todolists-reducer";
import {AddItemForm} from "common/components";
import {useActions} from "common/hooks/useActions";
import React, {ReactElement, useCallback} from "react";

type Props = {
  todolist: TodolistBLLType
}

export const TodoList = React.memo(({todolist}: Props): ReactElement => {

  const {addTask} = useActions(tasksThunks)
  const {removeTodolist} = useActions(todosThunks)

  const addTaskTDL = useCallback(
    (newTaskTitle: string) => addTask({todolistId: todolist.id, title: newTaskTitle}).unwrap(),
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