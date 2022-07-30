import React from 'react';
import '../../App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../store/store";
import {Menu,} from "@mui/icons-material";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "../../store/app-reducer";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
import {Route, Routes, Navigate} from 'react-router-dom'
import {Login} from "../Login/Login";
import {TodosList} from "../Todolist/TodosList";

//C-R-U-D
function AppWithRedux() {

    const appStatuses = useAppSelector<RequestStatusType>(state => state.app.status)
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
