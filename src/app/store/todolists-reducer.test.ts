import {
    ActionType,
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle,
    FilterType,
    RemoveTodolist,
    SetTodolists,
    TodolistBLLType,
    todolistsReducer
} from './todolists-reducer';


let startState: Array<TodolistBLLType>;

beforeEach(() => {

    startState = [
        {
            id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolist('todolistId1'))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('todolistId2');
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist10";
    const endState = todolistsReducer(startState, AddTodolist({addedDate: '',
        id: 'todolistId3',
        order: 0,
        title: newTodolistTitle,}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[2].title).toBe('What to buy');
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist10";

    const endState = todolistsReducer(startState, ChangeTodolistTitle("todolistId2", newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";

    const action: ActionType = ChangeTodolistFilter("todolistId2", newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be setted to state', () => {

    const action: ActionType = SetTodolists(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    });





