import {appActions} from "app/model/slice/appSlice";
import {AppDispatch} from "app/store/store";
import axios from "axios";
import {BaseResponseType} from "common/types/types";
import {BaseTasksRespType} from "features/TodosList/api/tasks/tasks.api.types";

/**
 * Handles network-related errors and dispatches an action to set the application error.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @param {unknown} error - The error object representing the network error.
 *
 * @returns {void}
 */
export const handleServerNetworkError = (dispatch: AppDispatch, error: unknown): void => {
  /**
   * Default error message to be displayed if no specific error message is determined.
   * @type {string}
   */
  let errorMessage = 'SOME ERROR OCCURRED';

  if (axios.isAxiosError(error)) {
    // If the error is an Axios error, use the response data message, error message, or default message
    // @ts-ignore
    errorMessage = error.response?.data?.message || error.message || errorMessage;
  } else if (error instanceof Error) {
    // If the error is a native JavaScript Error, include the error message in the response
    errorMessage = `Native error: ${error.message}`;
  } else {
    // If the error is of an unknown type, stringify the error object
    errorMessage = JSON.stringify(error);
  }

  // Dispatch the application error with the determined error message
  dispatch(appActions.setAppError({error: errorMessage}));
};


/**
 * Handles server-related errors and dispatches an action to set the application error.
 *
 * @template T - The type of the response data.
 * @template D - The type of tasks response data.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @param {BaseResponseType<T> | BaseTasksRespType<D>} data - The response data from the server.
 * @param {boolean} [showError=true] - A flag indicating whether to display the error message.
 *
 * @returns {void}
 */
export const handleServerAppError = <T, D>(
  dispatch: AppDispatch,
  data: BaseResponseType<T> | BaseTasksRespType<D>,
  showError: boolean = true
): void => {
  /**
   * Default error message to be displayed if no specific error message is received from the server.
   * @type {string}
   */
  let errorMessage = 'SOME ERROR OCCURRED';

  // Display the error message only if showError is true
  showError && dispatch(appActions.setAppError({error: !!data.messages ? data.messages[0] : errorMessage}));
};