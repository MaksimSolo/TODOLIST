import {Button, ButtonGroup} from "@mui/material";
import {PayloadAction} from "@reduxjs/toolkit";
import {FilterType, TodolistBLLType, todosActions} from "features/TodosList/model/todolists/slice/todolistsSlice";
import {useActions} from "common/hooks/useActions";
import React, {memo, ReactElement} from 'react';


type Props = {
  todolist: TodolistBLLType
}
export const FilterTasksButtons = memo(({todolist}: Props): ReactElement => {

  const {changeTodolistFilter} = useActions(todosActions)

  const changeFilterHandler = (filter: FilterType) =>
    (): PayloadAction<{ id: string; filter: FilterType }> => changeTodolistFilter({id: todolist.id, filter})

  return (
    <div>
      <ButtonGroup
        variant={"contained"}
        size={'small'}>
        <Button
          color={todolist.filter === "all" ? 'secondary' : "primary"}
          onClick={changeFilterHandler("all")}>All
        </Button>
        <Button
          color={todolist.filter === "active" ? 'secondary' : "primary"}
          onClick={changeFilterHandler("active")}>Active
        </Button>
        <Button
          color={todolist.filter === "completed" ? 'secondary' : "primary"}
          onClick={changeFilterHandler("completed")}>Completed
        </Button>
      </ButtonGroup>
    </div>
  );
});