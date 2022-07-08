import {appReducer, LinearProgressStateType, RequestStatusType, setAppStatusAC} from "./app-reducer";


let startState: LinearProgressStateType;


beforeEach(()=>{
    startState ={
        status: 'idle' as RequestStatusType
    }
})

test('correct status should be installed', ()=>{
    let newStatus:RequestStatusType = 'loading'

    const endState = appReducer(startState,setAppStatusAC(newStatus))

    expect(endState.status).toBe('loading')
    expect(startState.status).toBe('idle')
    expect(endState.status).not.toEqual(startState.status)

})

