import {appActions, appReducer, LinearProgressStateType, RequestStatusType} from "app/store/reducers/app-reducer";


let startState: LinearProgressStateType;


beforeEach(() => {
  startState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false,
  }
})

test('error message should be shown', () => {
  let error = 'some megaerror!!!!!!'

  const endState = appReducer(startState, appActions.setAppError({error}))

  expect(endState.error).not.toEqual(startState.error)
  expect(endState.error).toBe('some megaerror!!!!!!')
})

