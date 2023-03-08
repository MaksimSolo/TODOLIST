import {AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedIn} from "./auth-reducer";
import {ResponseResultCode} from "../../common/types/types";
import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

const appSlice = createSlice({
  name: 'APP',
  initialState: initialState,
  reducers: {
    setAppStatus: (state: LinearProgressStateType, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload
    },
    setAppError: (state: LinearProgressStateType, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setIsInitialized: (state: LinearProgressStateType, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    }
  }
})

export const appReducer: Reducer<LinearProgressStateType, AppStatusActionType> = appSlice.reducer

export const {setAppStatus, setAppError, setIsInitialized} = appSlice.actions


//thunk-creators
export const initializeApp = (): AppThunk => async dispatch => {
  try {
    const resp = await authAPI.me()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(setIsLoggedIn(true))
      dispatch(setAppStatus('succeeded'))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  } finally {
    dispatch(setIsInitialized(true))
  }
}


//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType =
  PayloadAction<RequestStatusType>
  | PayloadAction<string | null>
  | PayloadAction<boolean>