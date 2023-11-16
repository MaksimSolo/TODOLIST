import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "app/store/reducers/app-reducer";
import {authReducer} from "app/store/reducers/auth-reducer";
import {tasksReducer} from "app/store/reducers/tasks-reducer";
import {todolistsReducer} from "app/store/reducers/todolists-reducer";
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




















