import {AppStatusActionType, setAppError, setAppStatus} from "../../app/store/app-reducer";
import {Dispatch} from "redux";
import {BaseResponseType} from "../../app/api/todolist-api";
import {BaseTasksRespType} from "../../app/api/task-api";
import {AxiosError} from "axios";

export const handleServerNetworkError = (dispatch: Dispatch<AppStatusActionType>, error: AxiosError) => {
  dispatch(setAppError(error.message ? error.message : 'SOME ERROR OCCURRED'))
  dispatch(setAppStatus('failed'))
}

export const handleServerAppError = <T, D>(dispatch: Dispatch<AppStatusActionType>, data: BaseResponseType<T> | BaseTasksRespType<D>) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('SOME ERROR OCCURRED'))
  }
  dispatch(setAppStatus('failed'))
}