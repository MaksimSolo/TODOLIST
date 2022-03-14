import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";
import {AddTodolist} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {TodolistsType} from "./App";
import {Todolist10} from "./Todolist#10";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed";

//C-R-U-D
function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistsType>>(state => state.todolists)

    const addTodolist = (newTodoTitle: string) => {
        dispatch(AddTodolist(newTodoTitle))
    }

    const todolistForRender = todolists.map(tl => {

        return (
            <Grid item
                  key={tl.id}>
                <Paper elevation={20}
                       style={{padding: '15px', width: '300px', height: '400px'}}>
                    < Todolist10
                        key={tl.id}
                        todolistID={tl.id}
                    />
                </Paper>
            </Grid>
        )
    })
    //UI:
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={'center'} style={{padding: '15px'}}>
                    <Grid item>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent={'center'}>
                    {todolistForRender}
                </Grid>
            </Container>
        </div>
    )
}
export default AppWithRedux;
