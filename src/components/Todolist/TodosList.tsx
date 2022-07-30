import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {createTodolistTC, fetchTodolistsTC, TodolistBLLType} from "../../store/todolists-reducer";
import {useAppSelector} from "../../store/store";
import {Grid, Paper} from "@mui/material";
import {Todolist10} from "./Todolist#10";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export const TodosList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const todolists = useAppSelector<Array<TodolistBLLType>>(state => state.todolists) //нужен только возвращаемый тип
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
                        todolistID={tl.id}
                    />
                </Paper>
            </Grid>
        )
    }), [todolists]);

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