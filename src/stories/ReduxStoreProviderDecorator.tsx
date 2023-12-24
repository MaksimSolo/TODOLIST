import {configureStore} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses} from "features/TodosList/api/tasks/tasks.api.types";
import {appReducer} from "app/reducers/app-reducer";
import {authReducer} from "features/auth/reducers/auth-reducer";
import {tasksReducer} from "features/TodosList/reducers/tasks-reducer";
import {todolistsReducer} from "features/TodosList/reducers/todolists-reducer";
import React from "react";
import {Provider} from "react-redux";
import {combineReducers} from "redux";
import thunk from "redux-thunk";


type ReducersType = typeof rootReducers;
export type AppStateType = ReturnType<ReducersType>;

const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: authReducer,
})

const initialGlobalState: AppStateType = {

  todolists: [
    {
      id: 'todolistID1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '',
      order: 0
    },
    {
      id: 'todolistID2', title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '',
      order: 0
    },
  ],
  tasks: {
    'todolistID1': [
      {
        id: '1',
        title: "HTML&CSS",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '2',
        title: "JS",
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '3',
        title: "ReactJS",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '4',
        title: "Rest API",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '5',
        title: "GraphQL",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
    ],
    'todolistID2': [
      {
        id: '6',
        title: "Milk",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '7',
        title: "Beer",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '8',
        title: "Fish",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '9',
        title: "Book",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
      {
        id: '10',
        title: "Bread",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '',
        taskItemStatus: 'idle',
      },
    ]
  },
  app: {
    status: 'idle',
    error: null,
    isInitialized: false,
  },
  login: {
    isLoggedIn: true
  }
}

export const storyBookStore = configureStore({
  reducer: rootReducers,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend([thunk])
});


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


