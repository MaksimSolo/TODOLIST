import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";


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
    setAppInitialized: (state: LinearProgressStateType, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer: Reducer<LinearProgressStateType, AppStatusActionType> = slice.reducer

export const appActions = slice.actions

//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType =
  PayloadAction<{ status: RequestStatusType }>
  | PayloadAction<{ error: string | null }>
  | PayloadAction<{ isInitialized: boolean }>