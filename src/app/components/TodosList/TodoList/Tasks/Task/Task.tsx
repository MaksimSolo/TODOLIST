import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {TaskStatuses} from "app/api/tasks/tasks.api.types";
import {EditableSpan} from "app/components/EditableSpan/EditableSpan";
import s from 'app/components/TodosList/TodoList/Tasks/Task/styles/task.module.css'
import {TaskBLLType, tasksThunks} from "app/store/reducers/tasks-reducer";
import {useAppSelector} from "app/store/store";
import {useActions} from "common/hooks/useActions";
import React, {ChangeEvent, memo, ReactElement,} from 'react';


export type TaskProps = {
  todolistID: string
  taskID: string
}

export const Task = memo(({todolistID, taskID}: TaskProps): ReactElement => {

  const task = useAppSelector<TaskBLLType>(({tasks}) => tasks[todolistID].filter(({id}) => id === taskID)[0])

  const {removeTask: removeTaskThunk, updateTask} = useActions(tasksThunks)

  const getClasses = () => task.status === TaskStatuses.Completed ? s.isDone : ''

  const itemFontStyles = {fontWeight: 'bold'}

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({todolistID, taskID, changesForApiModel: {status}});
  }

  const changeTaskTitleHandler = (title: string) => updateTask({todolistID, taskID, changesForApiModel: {title}})

  const removeTaskHandler = () => removeTaskThunk({todolistID, taskID})

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
          onChange={changeStatusHandler}
          checked={task.status === TaskStatuses.Completed}
          style={{marginRight: '15px'}}
        />
        {task.status === TaskStatuses.Completed
          ? <span>{task.title}</span>
          : <EditableSpan disabled={task.taskItemStatus === 'loading'}
                          title={task.title}
                          changeTitle={changeTaskTitleHandler}/>}
      </div>
      <IconButton onClick={removeTaskHandler} disabled={task.taskItemStatus === 'loading'}>
        <Delete/>
      </IconButton>
    </ListItem>
  );
});


