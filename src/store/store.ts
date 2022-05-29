import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionType, todolistsReducer} from "./todolists-reducer";
import {ActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";


type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk));

type AppActionsType = ActionType | ActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;




















