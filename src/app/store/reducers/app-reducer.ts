import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
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

export const appReducer = slice.reducer

export const appActions = slice.actions

//types
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
