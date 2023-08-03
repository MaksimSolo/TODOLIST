import {ActionCreatorsMapObject} from "@reduxjs/toolkit";
import {useAppDispatch} from "app/store/store";
import {useMemo} from "react";
import {bindActionCreators} from "redux";


export const useActions = <T extends ActionCreatorsMapObject>(
  actions: T
) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch])
}

//Types
type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R ? IsValidArg<A> extends true
  ? (a: A) => TNewReturn : () => TNewReturn : never

type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true

type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>