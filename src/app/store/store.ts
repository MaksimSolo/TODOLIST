import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "app/model/slice/appSlice";
import {authSlice} from "features/auth/model/slice/authSlice";
import {tasksReducer} from "features/TodosList/model/tasks/slice/tasksSlice";
import {todolistsReducer} from "features/TodosList/model/todolists/slice/todolistsSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
      todolists: todolistsReducer,
      tasks: tasksReducer,
      app: appReducer,
      login: authSlice,
    },
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