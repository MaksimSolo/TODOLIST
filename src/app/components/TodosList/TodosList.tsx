import {Grid, Paper} from "@mui/material";
import {TasksStateType} from "app/store/reducers/tasks-reducer";
import {createTodolistTC, fetchTodolistsTC, TodolistBLLType} from "app/store/reducers/todolists-reducer";
import {useAppSelector} from "app/store/store";
import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import * as authSelectors from "./../../store/selectors/auth.selectors"
import * as taskSelectors from "./../../store/selectors/task.selectors"
import * as todolistSelectors from "./../../store/selectors/todolist.selectors"
import {Todolist10} from "./Todolist10/Todolist#10";

export const TodosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedIn)
  const todolists = useAppSelector<TodolistBLLType[]>(todolistSelectors.todolists)
  const tasks = useAppSelector<TasksStateType>(taskSelectors.tasks)

  const addTodolist = useCallback((newTodoTitle: string) => {
    dispatch(createTodolistTC(newTodoTitle))
  }, [dispatch]);

  const todolistForRender = useMemo(() => todolists.map(tl => {
    return (
      <Grid item
            key={tl.id}>
        <Paper elevation={20}
               style={{padding: '15px', minWidth: '300px', maxWidth: '300px', minHeight: '100px'}}>
          < Todolist10
            key={tl.id}
            todolist={tl}
            tasks={tasks[tl.id]}
          />
        </Paper>
      </Grid>
    )
  }), [todolists, tasks]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      dispatch(fetchTodolistsTC())
    }
  }, [isLoggedIn, dispatch, navigate])

  return <>
    <Grid container justifyContent={'center'} style={{padding: '15px'}}>
      <Grid item>
        <AddItemForm addItem={addTodolist} disabled={false}/>
      </Grid>
    </Grid>
    <Grid container spacing={5} justifyContent={'center'}>
      {todolistForRender}
    </Grid>
  </>
}