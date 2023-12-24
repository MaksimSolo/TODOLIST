import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "app/reducers/app-reducer";
import {authReducer} from "features/auth/reducers/auth-reducer";
import {tasksReducer} from "features/TodosList/reducers/tasks-reducer";
import {todolistsReducer} from "features/TodosList/reducers/todolists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
      todolists: todolistsReducer,
      tasks: tasksReducer,
      app: appReducer,
      login: authReducer,
    }
  }
);

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector  //таким образом можно типизировать входящий тип данных в useSelector
//и далее по приложению пользоваться useAppSelector

export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

// @ts-ignore
window.store = store;