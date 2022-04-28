import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {TaskType} from "../../App";

export type TaskPropsType ={
    todolistID: string
    taskID: string
}

export const Task = React.memo(({todolistID,taskID}: TaskPropsType) => {
    console.log('Task')
    const task = useSelector<AppStateType, TaskType>(state => state.tasks[todolistID].filter(t=>t.id===taskID)[0])
    const dispatch = useDispatch();

    const getClasses = () => task.isDone ? "is-done" : ''
    const itemFontStyles = {fontWeight: 'bold'}
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, e.currentTarget.checked));
    },[dispatch,todolistID, taskID]);
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    },[dispatch,todolistID,taskID,]);
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistID, taskID));
    },[dispatch,todolistID, taskID]);
    return (
        <ListItem key={taskID}
                  className={getClasses()}
                  divider
                  disableGutters
                  style={{display: "flex", justifyContent: 'space-between'}}>

            <div style={itemFontStyles}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    onChange={changeStatus}
                    checked={task.isDone}
                    style={{marginRight: '15px'}}
                />
                {task.isDone
                    ? <span>{task.title}</span>
                    : <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>}
            </div>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    );
});


