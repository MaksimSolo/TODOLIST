import {AppStatusActionType, setAppErrorAC, setAppStatusAC} from "../../app/store/app-reducer";
import {Dispatch} from "redux";
import {BaseResponseType} from "../../app/api/todolist-api";
import {BaseTasksRespType} from "../../app/api/task-api";
import {AxiosError} from "axios";

export const handleServerNetworkError = (dispatch: Dispatch<AppStatusActionType>, error: AxiosError) => {
  dispatch(setAppErrorAC(error.message ? error.message : 'SOME ERROR OCCURRED'))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T, D>(dispatch: Dispatch<AppStatusActionType>, data: BaseResponseType<T> | BaseTasksRespType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('SOME ERROR OCCURRED'))
  }
  dispatch(setAppStatusAC('failed'))
}