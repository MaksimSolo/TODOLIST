import {AnyAction, createAsyncThunk, createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {authApi} from "app/api/auth/auth.api";
import {appActions} from "app/store/reducers/app-reducer";
import {LoginParamsType, ResultCode} from "common/types/types";
import {createAppAsyncThunk, errorUtils} from 'common/utils'

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    const resp = await authApi.login(arg)
    if (resp.data.resultCode === ResultCode.OK) {
      return {isLoggedIn: true}
    } else {
      const showError = !resp.data.fieldsErrors.length
      errorUtils.handleServerAppError(dispatch, resp.data, showError)
      return rejectWithValue(resp.data)
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
    const resp = await authApi.logout()
    if (resp.data.resultCode === ResultCode.OK) {
      dispatch(authActions.clearStateData())
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
    const resp = await authApi.me()
    if (resp.data.resultCode === ResultCode.OK) {
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
  extraReducers:
    builder =>
      builder.addMatcher(
        (action: AnyAction) =>
          action.type === 'auth/login/fulfilled' ||
          action.type === 'app/logout/fulfilled' ||
          action.type === 'app/setAppInitialized/fulfilled'
        ,
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        }
      )
})

export const authReducer: Reducer<AuthStateType, LoggedInActionType> = slice.reducer

export const authActions = slice.actions

export const authThunks = {login, logout, initializeApp}

//types
export type AuthStateType = {
  isLoggedIn: boolean
}
export type LoggedInActionType = PayloadAction<{ isLoggedIn: boolean }> | ReturnType<typeof authActions.clearStateData>