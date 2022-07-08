import React, {useCallback, useEffect, useMemo} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {addTaskTC, fetchTasksTC} from "../../store/tasks-reducer";
import {
    ChangeTodolistFilter,
    FilterType,
    removeTodolistTC,
    TodolistBLLType,
    updateTodolistTitleTC
} from "../../store/todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/task-api";


type PropsType = {
    todolistID: string
}

export const Todolist10 = React.memo((props: PropsType) => {
    console.log('Todolist rendering')

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistID))
    }, [props.todolistID, dispatch])

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
    const tasksJSX = useMemo(() => tasksForRender(todolist.filter, tasks).map(t => <Task key={t.id}
                                                                                         todolistID={props.todolistID}
                                                                                         taskID={t.id}/>), [props.todolistID, tasks, todolist.filter]);
    const addTaskTDL = useCallback((newTaskTitle: string) => dispatch(addTaskTC(props.todolistID, newTaskTitle)), [dispatch, props.todolistID]);
    const changeTodoTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC(title, props.todolistID,));
    }, [dispatch, props.todolistID,]);

    const onAllFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "all")), [dispatch, props.todolistID]);
    const onActiveFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "active")), [dispatch, props.todolistID]);
    const onCompletedFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistID, "completed")), [dispatch, props.todolistID]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            wordBreak: 'break-all', alignItems:'center'
        }}>
            <Typography
                variant={'h5'}
                align={'center'}
                style={{fontWeight: 'bold'}}>
                <EditableSpan title={todolist.title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={() => dispatch(removeTodolistTC(props.todolistID))}>
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