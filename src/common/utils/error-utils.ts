import {BaseTasksRespType} from "app/api/task-api";
import {BaseResponseType} from "app/api/todolist-api";
import {appActions, AppStatusActionType} from "app/store/reducers/app-reducer";
import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch<AppStatusActionType>, err: unknown) => {
  const error = err as AxiosError<{ error: string }> | Error
  if (axios.isAxiosError(error)) {
    dispatch(appActions.setAppError({error: error.message ? error.message : 'SOME ERROR OCCURRED'}))
  } else {
    dispatch(appActions.setAppError({error: `Native error: ${error.message}`}))
  }
  dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerAppError = <T, D>(
  dispatch: Dispatch<AppStatusActionType>, data: BaseResponseType<T> | BaseTasksRespType<D>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({error: data.messages[0]}))
  } else {
    dispatch(appActions.setAppError({error: 'SOME ERROR OCCURRED'}))
  }
  dispatch(appActions.setAppStatus({status: 'failed'}))
}