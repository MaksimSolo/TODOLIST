import {ActionCreator, ActionCreatorsMapObject, AsyncThunk} from "@reduxjs/toolkit";
import {useAppDispatch} from "app/store/store";
import {useMemo} from "react";
import {bindActionCreators} from "redux";

/**
 * Hook that binds Redux action creators to the dispatch function, allowing them to be used within functional components.
 * @template Actions - The type of the action creators object.
 * @param {Actions} actions - The object containing Redux action creators.
 * @returns {BoundActions<Actions>} The bound action creators.
 */
export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch])
}

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

