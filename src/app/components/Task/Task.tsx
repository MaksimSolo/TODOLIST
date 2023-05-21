import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {TaskStatuses} from "app/api/task-api";
import {removeTaskTC, TaskBLLType, tasksThunks} from "app/store/reducers/tasks-reducer";
import {useAppSelector} from "app/store/store";
import React, {ChangeEvent, memo, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {EditableSpan} from "../EditableSpan/EditableSpan";


export type TaskPropsType = {
  todolistID: string
  taskID: string
}

export const Task = memo(({todolistID, taskID,}: TaskPropsType) => {

  const task = useAppSelector<TaskBLLType>(({tasks}) => tasks[todolistID].filter(({id}) => id === taskID)[0])
  const dispatch = useDispatch();

  const getClasses = () => task.status === TaskStatuses.Completed ? "is-done" : ''
  const itemFontStyles = {fontWeight: 'bold'}
  const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunks.updateTask({todolistID, taskID, changesForApiModel: {status}}));
  }, [dispatch, todolistID, taskID,]);
  const changeTaskTitle = useCallback(title => {
    dispatch(tasksThunks.updateTask({todolistID, taskID, changesForApiModel: {title}}))
  }, [dispatch, todolistID, taskID,]);
  const removeTask = useCallback(() => {
    dispatch(removeTaskTC(todolistID, taskID,));
  }, [dispatch, todolistID, taskID]);
  return (
    <ListItem
      key={taskID}
      className={getClasses()}
      divider
      disableGutters
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        textAlign: 'left',
      }}>

      <div style={itemFontStyles}>
        <Checkbox
          disabled={task.taskItemStatus === 'loading'}
          size={'small'}
          color={'primary'}
          onChange={changeStatus}
          checked={task.status === TaskStatuses.Completed}
          style={{marginRight: '15px'}}
        />
        {task.status === TaskStatuses.Completed
          ? <span>{task.title}</span>
          : <EditableSpan disabled={task.taskItemStatus === 'loading'}
                          title={task.title}
                          changeTitle={changeTaskTitle}/>}
      </div>
      <IconButton onClick={removeTask} disabled={task.taskItemStatus === 'loading'}>
        <Delete/>
      </IconButton>
    </ListItem>
  );
});


