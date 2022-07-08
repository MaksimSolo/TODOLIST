import {Provider} from "react-redux";
import React from "react";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "../store/todolists-reducer";
import {tasksReducer} from "../store/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {appReducer} from "../store/app-reducer";


type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initialGlobalState: AppStateType = {

    todolists: [
        {
            id: 'todolistID1', title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: 'todolistID2', title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ],
    tasks: {
        ['todolistID1']: [
            {
                id: '1', title: "HTML&CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: '2', title: "JS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: '3', title: "ReactJS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: '4', title: "Rest API", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
            {
                id: '5', title: "GraphQL", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
            },
        ],
        ['todolistID2']: [
            {id: '6', title: "Milk", status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''},
            {id: '7', title: "Beer", status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''},
            {id: '8', title: "Fish", status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''},
            {id: '9', title: "Book", status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''},
            {id: '10', title: "Bread", status: TaskStatuses.New, addedDate:'', deadline:'',
                description:'', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:''},
        ]
    },
    app: {
        status: 'idle'
    }
}

export const storyBookStore = createStore(rootReducers, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


