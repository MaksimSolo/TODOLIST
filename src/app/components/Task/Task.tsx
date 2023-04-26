import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {TaskStatuses} from "app/api/task-api";
import {AppStateType} from "app/store/store";
import {removeTaskTC, TaskBLLType, updateTaskTC} from "app/store/tasks-reducer";
import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditableSpan} from "../EditableSpan/EditableSpan";


export type TaskPropsType = {
  todolistID: string
  taskID: string
}

export const Task = React.memo(({todolistID, taskID,}: TaskPropsType) => {

  const task = useSelector<AppStateType, TaskBLLType>(({tasks}) => tasks[todolistID].filter(({id}) => id === taskID)[0])
  const dispatch = useDispatch();

  const getClasses = () => task.status === TaskStatuses.Completed ? "is-done" : ''
  const itemFontStyles = {fontWeight: 'bold'}
  const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(todolistID, taskID, {status}));
  }, [dispatch, todolistID, taskID,]);
  const changeTaskTitle = useCallback(title => {
    dispatch(updateTaskTC(todolistID, taskID, {title}))
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


