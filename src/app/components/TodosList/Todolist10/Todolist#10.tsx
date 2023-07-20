import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {PayloadAction} from "@reduxjs/toolkit";
import {TaskStatuses, TaskType} from "app/api/task-api";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {FilterType, TodolistBLLType, todosActions, todosThunks} from "app/store/reducers/todolists-reducer";
import {useActions} from "common/hooks/useActions";
import React, {useCallback, useMemo} from "react";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Task} from "../../Task/Task";

type PropsType = {
  todolist: TodolistBLLType
  tasks: TaskType[]
}

export const Todolist10 = React.memo(({todolist, tasks}: PropsType) => {

  const {addTask} = useActions(tasksThunks)
  const {updateTodolistTitle, removeTodolist} = useActions(todosThunks)
  const {changeTodolistFilter} = useActions(todosActions)

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

  const addTaskTDL = useCallback(
    (newTaskTitle: string) => addTask({todolistId: todolist.id, title: newTaskTitle}),
    [addTask, todolist.id]
  );
  const changeTodoTitle = useCallback((title: string) =>
    updateTodolistTitle({id: todolist.id, title}), [updateTodolistTitle, todolist.id,]);

  const removeTodo = useCallback(() => removeTodolist(todolist.id), [removeTodolist, todolist.id])

  const changeFilterHandler = (filter: FilterType) =>
    (): PayloadAction<{ id: string; filter: FilterType }> => changeTodolistFilter({id: todolist.id, filter})

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      wordBreak: 'break-all', alignItems: 'center'
    }}>
      <Typography
        variant={'h5'}
        align={'center'}
        style={{fontWeight: 'bold'}}>
        <EditableSpan title={todolist.title} changeTitle={changeTodoTitle}
                      disabled={todolist.entityStatus === 'loading'}/>
        <IconButton onClick={removeTodo} disabled={todolist.entityStatus === 'loading'}>
          <Delete/>
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTaskTDL} disabled={todolist.entityStatus === 'loading'}/>
      <ul>
        {tasksJSX}
      </ul>
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
    </div>
  )
});