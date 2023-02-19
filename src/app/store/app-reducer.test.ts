import {appReducer, LinearProgressStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";


let startState: LinearProgressStateType;


beforeEach(()=>{
    startState ={
        status: 'idle' as RequestStatusType,
        error: null
    }
})

test('correct status should be installed', ()=>{
    let newStatus:RequestStatusType = 'loading'

    const endState = appReducer(startState,setAppStatusAC(newStatus))

    expect(endState.status).toBe('loading')
    expect(startState.status).toBe('idle')
    expect(endState.status).not.toEqual(startState.status)

})

test('error message should be shown', ()=>{
    let errorMessage = 'some megaerror!!!!!!'

    const endState = appReducer(startState,setAppErrorAC(errorMessage))

    expect(endState.error).not.toEqual(startState.error)
    expect(endState.error).toBe('some megaerror!!!!!!')
})

