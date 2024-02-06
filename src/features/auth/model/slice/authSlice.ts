import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {LoginParamsType, ResultCode} from "common/types/types";
import {createAppAsyncThunk} from 'common/utils'
import {authApi} from "features/auth/api/auth.api";


const initialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    clearStateData: () => initialState
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(login.fulfilled, logout.fulfilled, initializeApp.fulfilled),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn
        }
      )

  }
})


// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`, async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    const resp = await authApi.login(arg)

    if (resp.data.resultCode === ResultCode.OK) {
      return {isLoggedIn: true}
    } else {
      return rejectWithValue(resp.data)
    }
  }
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch} = thunkAPI

    await authApi.logout()

    dispatch(authActions.clearStateData())

    return {isLoggedIn: false}
  }
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initialize`, async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    const resp = await authApi.me()

    if (resp.data.resultCode === ResultCode.OK) {
      return {isLoggedIn: true}
    } else {
      return rejectWithValue(resp.data)
    }
  }
)


export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout, initializeApp}
