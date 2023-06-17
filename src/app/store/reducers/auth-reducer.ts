import {createAsyncThunk, createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {authAPI} from "app/api/todolist-api";
import {appActions} from "app/store/reducers/app-reducer";
import {LoginParamsType, ResponseResultCode} from "common/types/types";
import {createAppAsyncThunk, errorUtils} from 'common/utils'

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await authAPI.login(arg)
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
      return {isLoggedIn: true}
    } else {
      errorUtils.handleServerAppError(dispatch, resp.data)
      return rejectWithValue(null)
    }
  }
  catch (error) {
    errorUtils.handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

const logout = createAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await authAPI.logout()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      dispatch(authActions.clearStateData())
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
      return {isLoggedIn: false}
    } else {
      errorUtils.handleServerAppError(dispatch, resp.data)
      return rejectWithValue(null)
    }
  }
  catch (error) {
    errorUtils.handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

const initializeApp = createAsyncThunk<{ isLoggedIn: boolean }, void>('app/initialize', async (_, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const resp = await authAPI.me()
    if (resp.data.resultCode === ResponseResultCode.OK) {
      return {isLoggedIn: true}
    } else {
      return rejectWithValue(null)
    }
  }
  catch (error) {
    errorUtils.handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
  finally {
    dispatch(appActions.setAppInitialized({isInitialized: true}))
    dispatch(appActions.setAppStatus({status: 'succeeded'}))
  }
})

const initialState: AuthStateType = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStateData: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  }
})

export const authReducer: Reducer<AuthStateType, LoggedInActionType> = slice.reducer

export const authActions = slice.actions

export const authThunk = {login, logout, initializeApp}

//types
export type AuthStateType = {
  isLoggedIn: boolean
}
export type LoggedInActionType = PayloadAction<{ isLoggedIn: boolean }> | ReturnType<typeof authActions.clearStateData>