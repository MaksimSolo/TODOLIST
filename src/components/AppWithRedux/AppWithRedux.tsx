import React, {useEffect} from 'react';
import '../../App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../store/store";
import {Menu,} from "@mui/icons-material";
import LinearProgress from '@mui/material/LinearProgress';
import {initializeApp, RequestStatusType} from "../../store/app-reducer";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
import {Route, Routes, Navigate} from 'react-router-dom'
import {Login} from "../Login/Login";
import {TodosList} from "../Todolist/TodosList";
import {useDispatch} from "react-redux";
import {logoutTC} from "../../store/auth-reducer";

//C-R-U-D
function AppWithRedux() {

    const dispatch=useDispatch();
    const appStatuses = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(()=>{
        dispatch(initializeApp())
    },[dispatch])

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
                    {isLoggedIn&& <Button onClick={()=>{dispatch(logoutTC())}} color='inherit' variant={'outlined'}>Logout</Button>}

                </Toolbar>
            </AppBar>
            {appStatuses === 'loading' && < LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodosList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={
                        <article>
                            <h1>ERROR 404</h1>
                            <h4 style={{textAlign: 'justify'}}>Ошибка 404 или Not Found («не найдено») — стандартный код ответа HTTP о том, что клиент
                                был в состоянии общаться с сервером, но сервер не может найти данные согласно запросу.
                                Ошибку 404 не следует путать с ошибкой «Сервер не найден» или иными ошибками,
                                указывающими на ограничение доступа к серверу. Ошибка 404 означает, что запрашиваемый
                                ресурс может быть доступен в будущем, что однако не гарантирует наличие прежнего
                                содержания.
                                Пользователи наиболее часто сталкиваются с ошибкой 404 при посещении так называемых
                                «битых» или «мёртвых ссылок», что делает, таким образом, ошибку 404 одной из наиболее
                                узнаваемых ошибок в сети Интернет</h4>
                        </article>
                    }/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default AppWithRedux;
