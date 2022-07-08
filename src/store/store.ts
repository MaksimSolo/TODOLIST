import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionType, todolistsReducer} from "./todolists-reducer";
import {ActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppStatusActionType} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk));

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector  //таким образом можно типизировать входящий тип данных в useSelector
//и далее по приложению пользоваться useAppSelector

//types
type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;
type AppActionsType = ActionType | ActionsType | AppStatusActionType;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;




















