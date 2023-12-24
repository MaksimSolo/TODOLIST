import {AppStateType} from "app/store/store";

export const status = ({app}: AppStateType) => app.status
export const error = ({app}: AppStateType) => app.error
export const isInitialized = ({app}: AppStateType) => app.isInitialized