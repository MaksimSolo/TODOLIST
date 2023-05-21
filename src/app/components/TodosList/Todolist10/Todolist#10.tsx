import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {TaskStatuses, TaskType} from "app/api/task-api";
import {tasksThunks} from "app/store/reducers/tasks-reducer";
import {
  FilterType,
  removeTodolistTC,
  TodolistBLLType,
  todosActions,
  updateTodolistTitleTC
} from "app/store/reducers/todolists-reducer";
import {useAppDispatch} from "app/store/store";
import React, {useCallback, useMemo} from "react";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Task} from "../../Task/Task";

type PropsType = {
  todolist: TodolistBLLType
  tasks: TaskType[]
}

export const Todolist10 = React.memo(({todolist, tasks}: PropsType) => {

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(tasksThunks.fetchTasks(todolist.id))
  // }, [])

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
    (newTaskTitle: string) => dispatch(tasksThunks.addTask({todolistId: todolist.id, title: newTaskTitle})),
    [dispatch, todolist.id]
  );
  const changeTodoTitle = useCallback((title: string) => {
    dispatch(updateTodolistTitleTC(title, todolist.id,));
  }, [dispatch, todolist.id,]);
  const removeTodolist = useCallback(() => dispatch(removeTodolistTC(todolist.id)), [dispatch, todolist.id]);

  const onAllFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: todolist.id,
    filter: "all"
  })), [dispatch, todolist.id]);
  const onActiveFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: todolist.id,
    filter: "active"
  })), [dispatch, todolist.id]);
  const onCompletedFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: todolist.id,
    filter: "completed"
  })), [dispatch, todolist.id]);

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
        <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
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
            onClick={onAllFilter}>All
          </Button>
          <Button
            color={todolist.filter === "active" ? 'secondary' : "primary"}
            onClick={onActiveFilter}>Active
          </Button>
          <Button
            color={todolist.filter === "completed" ? 'secondary' : "primary"}
            onClick={onCompletedFilter}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
});