import {AppStatusActionType, setAppErrorAC, setAppStatusAC} from "../store/app-reducer";
import {Dispatch} from "redux";
import {BaseResponseType} from "../api/todolist-api";
import {BaseTasksRespType} from "../api/task-api";

export const handleServerNetworkError = (dispatch: Dispatch<AppStatusActionType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T,D>(dispatch: Dispatch<AppStatusActionType>, data: BaseResponseType<T>|BaseTasksRespType<D>) => {
    dispatch(setAppErrorAC(data.messages[0]))
    dispatch(setAppStatusAC('failed'))
}