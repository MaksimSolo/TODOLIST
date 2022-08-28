import {AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolist-api";
import {clearStateData} from "./todolists-reducer";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthInitialStateType = initialState, action: LoggedInActionType): AuthInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state;
    }
};

//action-creator
export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk -creator
export const loginTC = (loginParams: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const resp = await authAPI.login(loginParams)
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, resp.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(dispatch, error.message)
    }
}

export const logoutTC = ():AppThunk=> async dispatch =>{
    try {
        dispatch(setAppStatusAC('loading'))
        const resp = await authAPI.logout()
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(clearStateData())
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, resp.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(dispatch, error.message)
    }
}


//types
export type AuthInitialStateType = typeof initialState;
export type LoggedInActionType = ReturnType<typeof setIsLoggedIn>