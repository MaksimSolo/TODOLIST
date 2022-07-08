const initialState = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: LinearProgressStateType = initialState, action: AppStatusActionType): LinearProgressStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state, status: action.status
            }
        default:
            return state;
    }
};

//action-creator
export const setAppStatusAC = (status:RequestStatusType)=>({type: 'APP/SET-STATUS', status} as const)

//types
export type LinearProgressStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStatusActionType = ReturnType<typeof setAppStatusAC>