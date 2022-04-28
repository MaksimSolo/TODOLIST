import {Provider} from "react-redux";
import React from "react";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "../store/todolists-reducer";
import {tasksReducer} from "../store/tasks-reducer";


type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppStateType = {

    todolists: [
        {id: 'todolistID1', title: 'What to learn', filter: 'all'},
        {id: 'todolistID2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistID1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        ['todolistID2']: [
            {id: '6', title: "Milk", isDone: true},
            {id: '7', title: "Beer", isDone: true},
            {id: '8', title: "Fish", isDone: false},
            {id: '9', title: "Book", isDone: false},
            {id: '10', title: "Bread", isDone: false},
        ]
    }
}

export const storyBookStore = createStore(rootReducers, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


