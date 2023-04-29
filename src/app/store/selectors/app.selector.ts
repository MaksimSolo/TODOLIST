import {AppStateType} from "app/store/store";

export const selectAppStatus = ({app}: AppStateType) => app.status
export const selectAppError = ({app}: AppStateType) => app.error
export const selectAppIsInitialized = ({app}: AppStateType) => app.isInitialized