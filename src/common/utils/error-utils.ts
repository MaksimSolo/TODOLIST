import {BaseTasksRespType} from "app/api/tasks/tasks.api.types";
import {appActions} from "app/store/reducers/app-reducer";
import {AppDispatch} from "app/store/store";
import axios from "axios";
import {BaseResponseType} from "common/types/types";


/**
 Handles server network errors.
 @param {AppDispatch} dispatch - The dispatch function from Redux.
 @param {unknown} error - The error object.
 */
export const handleServerNetworkError = (dispatch: AppDispatch, error: unknown): void => {
  let errorMessage = 'SOME ERROR OCCURRED'

  if (axios.isAxiosError(error)) {
    errorMessage = error.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(appActions.setAppError({error: errorMessage}))
}


/**
 Handles server application errors.
 @template T - The type of the response data.
 @template D - The type of the Tasks response data.
 @param {AppDispatch} dispatch - The dispatch function from Redux.
 @param {BaseResponseType<T> | BaseTasksRespType<D>} data - The response data object.
 @param {boolean} [showError=true] - Flag indicating whether to show the error or not.
 */
export const handleServerAppError = <T, D>(
  dispatch: AppDispatch, data: BaseResponseType<T> | BaseTasksRespType<D>,
  showError: boolean = true
) => {
  let errorMessage = 'SOME ERROR OCCURRED'
  showError && dispatch(appActions.setAppError({error: !!data.messages ? data.messages[0] : errorMessage}));
}