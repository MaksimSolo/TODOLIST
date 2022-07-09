import React, {useCallback, useEffect, useMemo} from 'react';
import '../../App.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {createTodolistTC, fetchTodolistsTC, TodolistBLLType} from "../../store/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/store";
import {Todolist10} from "../Todolist/Todolist#10";
import {Menu} from "@mui/icons-material";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "../../store/app-reducer";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";


//C-R-U-D
function AppWithRedux() {
    console.log("App rendering")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])


    const todolists = useAppSelector<Array<TodolistBLLType>>(state => state.todolists) //нужен только возвращаемый тип
    const addTodolist = useCallback((newTodoTitle: string) => {
        dispatch(createTodolistTC(newTodoTitle))
    }, [dispatch]);

    const appStatuses = useAppSelector<RequestStatusType>(state => state.app.status)

    const todolistForRender = useMemo(() => todolists.map(tl => {

        return (
            <Grid item
                  key={tl.id}>
                <Paper elevation={20}
                       style={{padding: '15px', minWidth: '300px', maxWidth: '300px', minHeight: '100px'}}>
                    < Todolist10
                        key={tl.id}
                        todolistID={tl.id}
                    />
                </Paper>
            </Grid>
        )
    }), [todolists]);
    //UI:
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            {appStatuses==='loading' && < LinearProgress color="secondary"/>}
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
