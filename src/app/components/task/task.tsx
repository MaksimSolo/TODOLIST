import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {TaskStatuses} from "app/api/tasks/tasks.api.types";
import {TaskBLLType, tasksThunks} from "app/store/reducers/tasks-reducer";
import {useAppSelector} from "app/store/store";
import {useActions} from "common/hooks/useActions";
import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";


export type TaskPropsType = {
  todolistID: string
  taskID: string
}

export const Task = memo(({todolistID, taskID}: TaskPropsType) => {

  const task = useAppSelector<TaskBLLType>(({tasks}) => tasks[todolistID].filter(({id}) => id === taskID)[0])
  const {removeTask: removeTaskThunk, updateTask} = useActions(tasksThunks)

  const getClasses = () => task.status === TaskStatuses.Completed ? "is-done" : ''
  const itemFontStyles = {fontWeight: 'bold'}
  const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({todolistID, taskID, changesForApiModel: {status}});
  }, [updateTask, todolistID, taskID,]);
  const changeTaskTitle = useCallback(title => {
    updateTask({todolistID, taskID, changesForApiModel: {title}})
  }, [updateTask, todolistID, taskID,]);
  const removeTask = useCallback(() => {
    removeTaskThunk({todolistID, taskID});
  }, [removeTaskThunk, todolistID, taskID]);
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


