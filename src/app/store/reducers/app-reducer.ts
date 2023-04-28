import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ResponseResultCode} from "common/types/types";
import {handleServerAppError, handleServerNetworkError} from "common/utils/error-utils";
import {authAPI} from "app/api/todolist-api";
import {authActions} from "app/store/reducers/auth-reducer";
import {AppThunk} from "app/store/store";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state: LinearProgressStateType, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state: LinearProgressStateType, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state: LinearProgressStateType, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer: Reducer<LinearProgressStateType, AppStatusActionType> = slice.reducer

export const appActions = slice.actions


//thunk-creators
export const initializeApp = (): AppThunk => async dispatch => {
  try {
    const resp = await authAPI.me()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  } finally {
    dispatch(appActions.setIsInitialized({isInitialized: true}))
  }
}


//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType =
  PayloadAction<{ status: RequestStatusType }>
  | PayloadAction<{ error: string | null }>
  | PayloadAction<{ isInitialized: boolean }>