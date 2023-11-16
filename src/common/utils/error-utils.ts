import {BaseTasksRespType} from "app/api/tasks/tasks.api.types";
import {appActions} from "app/store/reducers/app-reducer";
import axios, {AxiosError} from "axios";
import {BaseResponseType} from "common/types/types";
import {Dispatch} from "redux";


/**
 Handles server network errors.
 @param {Dispatch} dispatch - The dispatch function from Redux.
 @param {unknown} err - The error object.
 */
export const handleServerNetworkError = (dispatch: Dispatch, err: unknown) => {
  const error = err as AxiosError<{ error: string }> | Error
  if (axios.isAxiosError(error)) {
    dispatch(appActions.setAppError({error: error.message ? error.message : 'SOME ERROR OCCURRED'}))
  } else {
    dispatch(appActions.setAppError({error: `Native error: ${error.message}`}))
  }
}


/**
 Handles server application errors.
 @template T - The type of the response data.
 @template D - The type of the Tasks response data.
 @param {Dispatch} dispatch - The dispatch function from Redux.
 @param {BaseResponseType<T> | BaseTasksRespType<D>} data - The response data object.
 @param {boolean} [showError=true] - Flag indicating whether to show the error or not.
 */
export const handleServerAppError = <T, D>(
  dispatch: Dispatch, data: BaseResponseType<T> | BaseTasksRespType<D>,
  showError: boolean = true
) => {
  showError && dispatch(appActions.setAppError({error: !!data.messages ? data.messages[0] : 'SOME ERROR OCCURRED'}));
}