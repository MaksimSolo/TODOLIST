import {ActionType, FilterType, TodolistBLLType, todolistsReducer, todosActions} from 'app/store/reducers/todolists-reducer';


let startState: Array<TodolistBLLType>;

beforeEach(() => {

  startState = [
    {
      id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '',
      order: 0, entityStatus: 'idle'
    },
    {
      id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '',
      order: 0, entityStatus: 'idle'
    },
  ]
})

test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, todosActions.removeTodolist({id: 'todolistId1'}))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('todolistId2');
});


test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist10";
  const endState = todolistsReducer(startState, todosActions.addTodolist({
    todolist: {
      addedDate: '',
      id: 'todolistId3',
      order: 0,
      title: newTodolistTitle,
    }
  }))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[2].title).toBe('What to buy');
});


test('correct todolist should change its name', () => {
  let newTodolistTitle = "New Todolist10";

  const endState = todolistsReducer(startState, todosActions.changeTodolistTitle({
    id: "todolistId2",
    title: newTodolistTitle
  }));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterType = "completed";

  const action: ActionType = todosActions.changeTodolistFilter({id: "todolistId2", filter: newFilter});

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be setted to state', () => {

  const action: ActionType = todosActions.setTodolists({todolists: startState});

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});




