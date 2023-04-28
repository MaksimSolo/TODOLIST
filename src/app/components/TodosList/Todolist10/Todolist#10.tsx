import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {TaskStatuses, TaskType} from "app/api/task-api";
import {AppStateType} from "app/store/store";
import {addTaskTC} from "app/store/reducers/tasks-reducer";
import {
  FilterType,
  removeTodolistTC,
  TodolistBLLType,
  todosActions,
  updateTodolistTitleTC
} from "app/store/reducers/todolists-reducer";
import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Task} from "../../Task/Task";


type PropsType = {
  todolistID: string
}

export const Todolist10 = React.memo((props: PropsType) => {

  const dispatch = useDispatch();
  const todolist = useSelector<AppStateType, TodolistBLLType>(state => state.todolists.filter(tl => tl.id === props.todolistID)[0])
  const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

  const tasksForRender = (filter: FilterType, tasks: Array<TaskType>) => {
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
      todolistID={props.todolistID}
      taskID={t.id}/>), [props.todolistID, tasks, todolist.filter]);

  const addTaskTDL = useCallback((newTaskTitle: string) => dispatch(addTaskTC(props.todolistID, newTaskTitle)), [dispatch, props.todolistID]);
  const changeTodoTitle = useCallback((title: string) => {
    dispatch(updateTodolistTitleTC(title, props.todolistID,));
  }, [dispatch, props.todolistID,]);
  const removeTodolist = useCallback(() => dispatch(removeTodolistTC(props.todolistID)), [dispatch, props.todolistID]);

  const onAllFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: props.todolistID,
    filter: "all"
  })), [dispatch, props.todolistID]);
  const onActiveFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: props.todolistID,
    filter: "active"
  })), [dispatch, props.todolistID]);
  const onCompletedFilter = useCallback(() => dispatch(todosActions.changeTodolistFilter({
    id: props.todolistID,
    filter: "completed"
  })), [dispatch, props.todolistID]);

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