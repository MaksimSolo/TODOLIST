import {Menu,} from "@mui/icons-material";
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import 'app/ui/App.css';
import {RequestStatusType} from "app/model/slice/appSlice";
import {ErrorSnackbar, PageNotFound} from "common/components";
import {useActions} from "common/hooks/useActions";
import {Login} from "features/auth/ui/Login";
import {authThunks} from "features/auth/model/slice/authSlice";
import * as authSelectors from "features/auth/model/selectors/auth.selectors"
import {TodosList} from "features/TodosList/ui/TodosList";
import { useEffect } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import * as appSelectors from "app/model/selectors/app.selectors"
import {useAppSelector} from "app/store/store";

//C-R-U-D
function App() {

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

export default App;
