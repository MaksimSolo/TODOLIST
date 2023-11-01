import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction, Reducer} from "@reduxjs/toolkit";


const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state: LinearProgressStateType, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state: LinearProgressStateType, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  },
  extraReducers: builder =>
    builder
      .addMatcher(
        isPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        isFulfilled,
        (state) => {
          state.status = 'idle'
        }
      )
      .addMatcher(
        isRejected,
        (state, action: AnyAction) => {
          if (action.payload) {
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message ? action.error.message : 'SOME ERROR OCCURRED'
          }

          state.status = 'failed'
        }
      )
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