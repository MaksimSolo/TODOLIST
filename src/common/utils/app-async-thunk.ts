import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppStateType, AppThunkDispatch} from "app/store/store";
import {BaseResponseType} from "common/types/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType,
  dispatch: AppThunkDispatch,
  rejectValue: BaseResponseType | null
}>()