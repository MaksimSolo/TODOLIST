import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppStateType, AppThunkDispatch} from "app/store/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType,
  dispatch: AppThunkDispatch,
  rejectValue: null
}>()