import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseTasksRespType} from "app/api/tasks/tasks.api.types";
import {AppStateType, AppThunkDispatch} from "app/store/store";
import {BaseResponseType} from "common/types/types";


/**
 * A utility function that enhances the functionality of `createAsyncThunk` from Redux Toolkit.
 * It allows you to specify additional types for the `state`, `dispatch`, and `rejectValue` parameters.
 *
 * @template Payload - The type of the payload parameter in the async thunk action.
 * @template ThunkApiConfig - The type of the thunkApi configuration object.
 * @template AppStateType - The type of your application state.
 * @template AppThunkDispatch - The type of the dispatch function in your thunks.
 * @template BaseResponseType - The base response type that can be used in case of rejection (optional).
 *
 * @param {string} typePrefix - A string prefix for the generated action types.
 * @param {(payload: Payload, thunkAPI: ThunkApiConfig) => Promise<any>} payloadCreator - The function that creates the promise.
 *
 * @returns {AsyncThunk<Payload, ThunkApiConfig, { state: AppStateType, dispatch: AppThunkDispatch, rejectValue: BaseResponseType | null }>} The async thunk action creator.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType,
  dispatch: AppThunkDispatch,
  // rejectValue: BaseResponseType | BaseTasksRespType | null
  rejectValue: any
}>()