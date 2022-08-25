import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionType, todolistsReducer} from "./todolists-reducer";
import {ActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppStatusActionType} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer, LoggedInActionType} from "./auth-reducer";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: authReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk));

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector  //таким образом можно типизировать входящий тип данных в useSelector
//и далее по приложению пользоваться useAppSelector

//types
type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;
type AppActionsType = ActionType | ActionsType | AppStatusActionType | LoggedInActionType;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;




















