import React, {ChangeEvent, useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from "../../store/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {TaskStatuses, TaskType} from "../../api/task-api";


export type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = React.memo(({todolistID, taskID}: TaskPropsType) => {
    console.log('Task')
    const task = useSelector<AppStateType, TaskType>(state => state.tasks[todolistID].filter(t => t.id === taskID)[0])
    const dispatch = useDispatch();

    const getClasses = () => task.status === TaskStatuses.Completed ? "is-done" : ''
    const itemFontStyles = {fontWeight: 'bold'}
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistID, taskID, {status}));
    }, [dispatch,todolistID, taskID,]);
    const changeTaskTitle = useCallback(title => {
        dispatch(updateTaskTC(todolistID, taskID, {title}))
    }, [dispatch, todolistID, taskID,]);
    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todolistID, taskID,));
    }, [dispatch, todolistID, taskID]);
    return (
        <ListItem key={taskID}
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
                    size={'small'}
                    color={'primary'}
                    onChange={changeStatus}
                    checked={task.status === TaskStatuses.Completed}
                    style={{marginRight: '15px'}}
                />
                {task.status === TaskStatuses.Completed
                    ? <span>{task.title}</span>
                    : <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>}
            </div>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    );
});


