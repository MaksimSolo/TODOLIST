import {appActions, appReducer, LinearProgressStateType, RequestStatusType} from "app/store/reducers/app-reducer";


let startState: LinearProgressStateType;


beforeEach(() => {
  startState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false,
  }
})

test('correct status should be installed', () => {
  let status: RequestStatusType = 'loading'

  const endState = appReducer(startState, appActions.setAppStatus({status}))

  expect(endState.status).toBe('loading')
  expect(startState.status).toBe('idle')
  expect(endState.status).not.toEqual(startState.status)

})

test('error message should be shown', () => {
  let error = 'some megaerror!!!!!!'

  const endState = appReducer(startState, appActions.setAppError({error}))

  expect(endState.error).not.toEqual(startState.error)
  expect(endState.error).toBe('some megaerror!!!!!!')
})

