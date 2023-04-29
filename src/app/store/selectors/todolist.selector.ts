import {TodolistBLLType} from "app/store/reducers/todolists-reducer";
import {AppStateType} from "app/store/store";

export const selectTodolists = ({todolists}: AppStateType) => todolists
export const selectTodolistId = (todolists: TodolistBLLType[]) => todolists.map(({id}) => id)
// export const selectTodolist = createSelector([selectTodolists, selectTodolistId], (todolists: TodolistBLLType[], id: number) => todolists.filter(({id}) => id === todolistIdFromProps)[0]
