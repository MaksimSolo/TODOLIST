import {AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {setAppStatus} from "./app-reducer";
import {authAPI} from "../api/todolist-api";
import {clearStateData} from "./todolists-reducer";
import {LoginParamsType, ResponseResultCode} from "../../common/types/types";
import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state: AuthStateType, action: LoggedInActionType) => {
      state.isLoggedIn = action.payload
    }
  }
})

export const authReducer: Reducer<AuthStateType, LoggedInActionType> = authSlice.reducer

export const {setIsLoggedIn} = authSlice.actions

//thunk -creator
export const loginTC = (loginParams: LoginParamsType): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('loading'))
    const resp = await authAPI.login(loginParams)
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(setIsLoggedIn(true))
      dispatch(setAppStatus('succeeded'))
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
    dispatch(setAppStatus('loading'))
    const resp = await authAPI.logout()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(setIsLoggedIn(false))
      dispatch(clearStateData())
      dispatch(setAppStatus('succeeded'))
    } else {
      handleServerAppError(dispatch, resp.data)
    }
  } catch (err) {
    const error = err as AxiosError
    handleServerNetworkError(dispatch, error)
  }
}


//types
export type AuthStateType = typeof initialState;
export type LoggedInActionType = PayloadAction<boolean>