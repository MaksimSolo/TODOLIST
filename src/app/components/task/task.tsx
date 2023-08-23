import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {TaskStatuses} from "app/api/tasks/tasks.api.types";
import s from 'app/components/task/styles/task.module.css'
import {TaskBLLType, tasksThunks} from "app/store/reducers/tasks-reducer";
import {useAppSelector} from "app/store/store";
import {useActions} from "common/hooks/useActions";
import React, {ChangeEvent, FC, memo,} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";


export type TaskProps = {
  todolistID: string
  taskID: string
}

export const Task: FC<TaskProps> = memo(({todolistID, taskID}) => {

  const task = useAppSelector<TaskBLLType>(({tasks}) => tasks[todolistID].filter(({id}) => id === taskID)[0])

  const {removeTask: removeTaskThunk, updateTask} = useActions(tasksThunks)

  const getClasses = () => task.status === TaskStatuses.Completed ? s.isDone : ''

  const itemFontStyles = {fontWeight: 'bold'}

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({todolistID, taskID, changesForApiModel: {status}});
  }

  const changeTaskTitle = (title: string) => updateTask({todolistID, taskID, changesForApiModel: {title}})

  const removeTask = () => removeTaskThunk({todolistID, taskID})

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


