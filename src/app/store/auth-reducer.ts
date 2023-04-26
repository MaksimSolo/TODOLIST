import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {LoginParamsType, ResponseResultCode} from "common/types/types";
import {handleServerAppError, handleServerNetworkError} from "common/utils/error-utils";
import {authAPI} from "../api/todolist-api";
import {appActions} from "./app-reducer";
import {AppThunk} from "./store";

const initialState: AuthStateType = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state: AuthStateType, action: LoggedInActionType) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    clearStateData: (state) => {
      state.isLoggedIn = initialState.isLoggedIn
    }
  },
})

export const authReducer: Reducer<AuthStateType, LoggedInActionType> = slice.reducer

export const authActions = slice.actions

//thunk -creator
export const loginTC = (loginParams: LoginParamsType): AppThunk => async dispatch => {
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await authAPI.login(loginParams)
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(appActions.setAppStatus({status:'loading'}))
    const resp = await authAPI.logout()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
      // dispatch(authActions.clearStateData())
      dispatch(appActions.setAppStatus({status:'succeeded'}))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}


//types
export type AuthStateType = {
  isLoggedIn: boolean
}
export type LoggedInActionType = PayloadAction<{ isLoggedIn: boolean }>