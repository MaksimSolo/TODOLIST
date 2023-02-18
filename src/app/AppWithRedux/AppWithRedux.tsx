import React, {useEffect} from 'react';
import '../../App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../store/store";
import {Menu,} from "@mui/icons-material";
import LinearProgress from '@mui/material/LinearProgress';
import {initializeApp, RequestStatusType} from "../../store/app-reducer";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from "../../components/Login/Login";
import {TodosList} from "../../components/Todolist/TodosList";
import {useDispatch} from "react-redux";
import {logoutTC} from "../../store/auth-reducer";
import {PageNotFound} from "../../components/PageNotFound/PageNotFound";

//C-R-U-D
function AppWithRedux() {

  const dispatch = useDispatch();
  const appStatuses = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

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
