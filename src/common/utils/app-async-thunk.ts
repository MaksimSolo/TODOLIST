import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseTasksRespType} from "features/TodosList/api/tasks/tasks.api.types";
import {AppDispatch, AppStateType} from "app/store/store";
import {BaseResponseType} from "common/types/types";

/**
 * Creates an asynchronous Redux thunk with specified types for state, dispatch, and reject value.
 *
 * @type {import('@reduxjs/toolkit').AsyncThunk<
 *   BaseTasksRespType | BaseResponseType,
 *   void,
 *   {
 *     state: AppStateType,
 *     dispatch: AppDispatch,
 *     rejectValue: null | BaseTasksRespType | BaseResponseType
 *   }
 * >}
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType,
  dispatch: AppDispatch,
  rejectValue: null | BaseTasksRespType | BaseResponseType
}>();