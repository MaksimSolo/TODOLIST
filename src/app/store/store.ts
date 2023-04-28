import {combineReducers} from "redux";
import {ActionType, todolistsReducer} from "app/store/reducers/todolists-reducer";
import {ActionsType, tasksReducer} from "app/store/reducers/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppStatusActionType} from "app/store/reducers/app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer, LoggedInActionType} from "app/store/reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: authReducer,
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend([thunk])
  }
);

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector  //таким образом можно типизировать входящий тип данных в useSelector
//и далее по приложению пользоваться useAppSelector

export const useAppDispatch: () => AppThunkDispatch = useDispatch

//types
export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>
type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;
type AppActionsType = ActionType | ActionsType | AppStatusActionType | LoggedInActionType;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store;




















