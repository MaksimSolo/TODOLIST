import {Menu,} from "@mui/icons-material";
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "app/store/reducers/app-reducer";
import {authThunks} from "app/store/reducers/auth-reducer";
import {useActions} from "common/hooks/useActions";
import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import '../styles/App.css';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "./components/Login/Login";
import {PageNotFound} from "./components/PageNotFound/PageNotFound";
import {TodosList} from "app/components/todos-list/todos-list";
import * as appSelectors from "./store/selectors/app.selectors"
import * as authSelectors from "./store/selectors/auth.selectors"
import {useAppSelector} from "./store/store";

//C-R-U-D
function AppWithRedux() {

  const {initializeApp, logout} = useActions(authThunks);
  const appStatus = useAppSelector<RequestStatusType>(appSelectors.status)
  const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedIn)
  const isInitialized = useAppSelector<boolean>(appSelectors.isInitialized)

  useEffect(() => {
    initializeApp({})
  }, [initializeApp])

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

          {isLoggedIn &&
              <Button onClick={() => logout({})} color='inherit' variant={'outlined'}>
                  Logout
              </Button>}
        </Toolbar>
      </AppBar>
      {appStatus === 'loading' && < LinearProgress color="secondary"/>}
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
