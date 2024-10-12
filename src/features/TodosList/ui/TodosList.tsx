import {Grid, Paper} from "@mui/material";
import {TodoList} from "features/TodosList/ui/TodoList/TodoList";
import {TodolistBLLType, todosThunks} from "features/TodosList/model/todolists/slice/todolistsSlice";
import {useAppSelector} from "app/store/store";
import {AddItemForm} from "common/components";
import {useActions} from "common/hooks/useActions";
import { useCallback, useEffect, useMemo } from "react";
import {useNavigate} from "react-router-dom";
import * as authSelectors from "features/auth/model/selectors/auth.selectors"
import * as todolistSelectors from "features/TodosList/model/todolists/selectors/todolist.selectors"

export const TodosList = () => {
  const {createTodolist, fetchTodolists} = useActions(todosThunks)
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedIn)
  const todolists = useAppSelector<TodolistBLLType[]>(todolistSelectors.todolists)

  const addTodolist = useCallback((newTodoTitle: string) => {
    return createTodolist(newTodoTitle).unwrap()
  }, [createTodolist]);

  const todolistForRender = useMemo(() => todolists.map(tl => {
    return (
      <Grid item
            key={tl.id}>
        <Paper elevation={20}
               style={{padding: '15px', minWidth: '300px', maxWidth: '300px', minHeight: '100px'}}>
          < TodoList
            key={tl.id}
            todolist={tl}
          />
        </Paper>
      </Grid>
    )
  }), [todolists]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      fetchTodolists({})
    }
  }, [isLoggedIn, fetchTodolists, navigate])

  return (
    <>
      <Grid container justifyContent={'center'} style={{padding: '15px'}}>
        <Grid item>
          <AddItemForm addItem={addTodolist} disabled={false}/>
        </Grid>
      </Grid>
      <Grid container spacing={5} justifyContent={'center'}>
        {todolistForRender}
      </Grid>
    </>
  )
}