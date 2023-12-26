import {appActions, appReducer, InitialStateType, RequestStatusType} from "app/model/slice/appSlice";


let startState: InitialStateType;


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

