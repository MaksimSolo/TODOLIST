import {Typography} from "@mui/material";
import {TodolistBLLType, todosThunks} from "features/TodosList/model/todolists/slice/todolistsSlice";
import {EditableSpan} from "common/components";
import {useActions} from "common/hooks/useActions";
import { memo, ReactElement, useCallback } from 'react';


type Props = {
  todolist: TodolistBLLType
}

export const TodoListTitle = memo(({todolist}: Props): ReactElement => {

  const {updateTodolistTitle} = useActions(todosThunks)

  const changeTodoTitle = useCallback((title: string) =>
    updateTodolistTitle({id: todolist.id, title}), [updateTodolistTitle, todolist.id,]);

  return (
    <Typography
      variant={'h5'}
      align={'center'}
      style={{fontWeight: 'bold'}}>
      <EditableSpan title={todolist.title} changeTitle={changeTodoTitle}
                    disabled={todolist.entityStatus === 'loading'}/>
    </Typography>
  );
});