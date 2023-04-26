import {Grid, Paper} from "@mui/material";
import {useAppSelector} from "app/store/store";
import {createTodolistTC, fetchTodolistsTC, TodolistBLLType} from "app/store/todolists-reducer";
import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist10} from "./Todolist10/Todolist#10";

export const TodosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(({login}) => login.isLoggedIn)
  const todolists = useAppSelector<TodolistBLLType[]>(({todolists}) => todolists) //нужен только возвращаемый тип

  const addTodolist = useCallback((newTodoTitle: string) => {
    dispatch(createTodolistTC(newTodoTitle))
  }, [dispatch]);

  const todolistForRender = useMemo(() => todolists.map(({id}) => {
    return (
      <Grid item
            key={id}>
        <Paper elevation={20}
               style={{padding: '15px', minWidth: '300px', maxWidth: '300px', minHeight: '100px'}}>
          < Todolist10
            key={id}
            todolistID={id}
          />
        </Paper>
      </Grid>
    )
  }), [todolists]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
    dispatch(fetchTodolistsTC())
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