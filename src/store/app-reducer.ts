import {AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedIn} from "./auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export const appReducer = (state: LinearProgressStateType = initialState, action: AppStatusActionType): LinearProgressStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state, status: action.status
            }
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state;
    }
};

//action-creator
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

//thunk-creators
export const initializeApp = (): AppThunk => async dispatch => {
    try {
        const resp = await authAPI.me()
        dispatch(setIsInitializedAC(true));
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerAppError(dispatch, resp.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(dispatch, error.message)
    }
}


//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>