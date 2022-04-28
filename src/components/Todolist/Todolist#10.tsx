import React, {useCallback, useMemo} from "react";
import {FilterType, TaskType, TodolistsType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Provider, useDispatch, useSelector} from "react-redux";
import {AppStateType, store} from "../../store/store";
import {addTaskAC} from "../../store/tasks-reducer";
import {ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist} from "../../store/todolists-reducer";
import {Task} from "../Task/Task";


type PropsType = {
    todolistID: string
}

export const Todolist10= React.memo((props: PropsType) => {
    console.log('Todolist rendering')
    const dispatch = useDispatch();
    const todolist = useSelector<AppStateType, TodolistsType>(state => state.todolists.filter(tl=>tl.id===props.todolistID)[0])
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const tasksForRender = (filter: FilterType, tasks: Array<TaskType>) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }
    const tasksJSX = useMemo(()=>tasksForRender(todolist.filter, tasks).map(t => <Task key={t.id} todolistID={props.todolistID} taskID={t.id}/>),[props.todolistID,tasks,todolist.filter]);
    const addTaskTDL = useCallback((newTaskTitle: string) => dispatch(addTaskAC(props.todolistID, newTaskTitle)),[dispatch,props.todolistID]);
    const changeTodoTitle = useCallback((title: string) => {
        dispatch(ChangeTodolistTitle(props.todolistID, title));
    }, [dispatch,props.todolistID,]);

    const onAllFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "all")),[dispatch,props.todolistID]);
    const onActiveFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "active")),[dispatch,props.todolistID]);
    const onCompletedFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "completed")),[dispatch,props.todolistID]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <Typography
            variant={'h5'}
            align={'center'}
            style={{fontWeight:'bold'}}>
                <EditableSpan title={todolist.title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={() => dispatch(RemoveTodolist(props.todolistID))}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskTDL}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={'small'}
                    fullWidth
                >
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