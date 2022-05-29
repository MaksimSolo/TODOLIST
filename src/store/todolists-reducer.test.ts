import {
    ActionType,
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle, FilterType,
    RemoveTodolist,
    SetTodolists,
    TodolistBLLType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistBLLType>;

beforeEach(() => {
    let todolistId1: string = v1();
    let todolistId2: string = v1();

    startState = [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolist(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, AddTodolist(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodolistTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";

    const action: ActionType = ChangeTodolistFilter(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be setted to state', () => {

    const action: ActionType = SetTodolists(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    });





