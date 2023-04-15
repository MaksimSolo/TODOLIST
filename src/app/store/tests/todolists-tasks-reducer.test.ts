import {addTodolist, TodolistBLLType, todolistsReducer} from "../todolists-reducer";
import {tasksReducer, TasksStateType} from "../tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistBLLType> = [];

    const action = addTodolist({
        addedDate: '',
        id: 'todolistId3',
        order: 0,
        title: "new todolist",
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});

