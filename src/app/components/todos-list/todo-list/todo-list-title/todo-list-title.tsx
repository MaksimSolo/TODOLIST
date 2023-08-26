import {Typography} from "@mui/material";
import {EditableSpan} from "app/components/EditableSpan/EditableSpan";
import {TodolistBLLType, todosThunks} from "app/store/reducers/todolists-reducer";
import {useActions} from "common/hooks/useActions";
import React, {FC, memo, useCallback} from 'react';


type Props = {
  todolist: TodolistBLLType
}

export const TodoListTitle: FC<Props> = memo(({todolist}) => {

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