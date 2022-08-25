const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export const appReducer = (state: LinearProgressStateType = initialState, action: AppStatusActionType): LinearProgressStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state, status: action.status
            }
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

//action-creator
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error:string | null)=>({type: 'APP/SET-ERROR', error} as const)

//thunk



//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>