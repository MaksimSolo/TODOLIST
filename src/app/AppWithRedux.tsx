import {Menu,} from "@mui/icons-material";
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {selectIsLoggedIn} from "app/store/selectors/auth.selector";
import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import '../styles/App.css';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "./components/Login/Login";
import {PageNotFound} from "./components/PageNotFound/PageNotFound";
import {TodosList} from "./components/TodosList/TodosList";
import {initializeApp, RequestStatusType} from "app/store/reducers/app-reducer";
import {logoutTC} from "app/store/reducers/auth-reducer";
import {useAppDispatch, useAppSelector} from "./store/store";

//C-R-U-D
function AppWithRedux() {

  const dispatch = useAppDispatch();
  const appStatuses = useAppSelector<RequestStatusType>(({app}) => app.status)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const isInitialized = useAppSelector<boolean>(({app}) => app.isInitialized)

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

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
          {isLoggedIn && <Button onClick={() => {
            dispatch(logoutTC())
          }} color='inherit' variant={'outlined'}>Logout</Button>}

        </Toolbar>
      </AppBar>
      {appStatuses === 'loading' && < LinearProgress color="secondary"/>}
      <Container fixed>
        <Routes>
          <Route path='/' element={<TodosList/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/404' element={<PageNotFound/>}/>
          <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>
      </Container>
    </div>
  )
}

export default AppWithRedux;
