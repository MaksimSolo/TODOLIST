import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseTasksRespType} from "app/api/tasks/tasks.api.types";
import {AppDispatch, AppStateType} from "app/store/store";
import {BaseResponseType} from "common/types/types";


/**
 * A utility function that enhances the functionality of `createAsyncThunk` from Redux Toolkit.
 * It allows you to specify additional types for the `state`, `dispatch`, and `rejectValue` parameters.
 *
 * @template AppStateType - The type of your application state.
 * @template AppDispatch - The type of the dispatch function in your thunks.
 *
 * @param {(payload: Payload, thunkAPI: ThunkApiConfig) => Promise<any>} payloadCreator - The function that creates the promise.
 *
 * @returns {AsyncThunk<Payload, ThunkApiConfig, { state: AppStateType, dispatch: AppDispatch, rejectValue:  null }>} The async thunk action creator.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType,
  dispatch: AppDispatch,
  rejectValue: null | BaseTasksRespType | BaseResponseType
}>()