import {ActionsType, addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TasksStateType} from '../../App';
import {AddTodolist, RemoveTodolist, SetTodolists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";


let startState: TasksStateType = {};

beforeEach(() => {

  startState = {
    "todolistId1": [
      {
        id: "1", title: "CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      },
      {
        id: "2", title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      },
      {
        id: "3", title: "React", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      }
    ],
    "todolistId2": [
      {
        id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      },
      {
        id: "2", title: "milk", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      },
      {
        id: "3", title: "tea", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '',
        taskItemStatus: 'idle'
      }
    ]
  };
})

test('correct task should be deleted from correct array', () => {


  const action: ActionsType = removeTaskAC("todolistId2", "2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    "todolistId1": [
      {
        id: "1", title: "CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
      },
      {
        id: "2", title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
      },
      {
        id: "3", title: "React", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
      }
    ],
    "todolistId2": [
      {
        id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
      },
      {
        id: "3", title: "tea", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: ''
      }
    ]
  });
});


test('correct task should be added to correct array', () => {


  // const action = addTaskAC("todolistId2", "juice");
  const action = addTaskAC({
    addedDate: '',
    deadline: '',
    description: '',
    id: 'bla',
    order: 0,
    priority: TaskPriorities.Low,
    startDate: '',
    status: TaskStatuses.New,
    title: "juice",
    todoListId: "todolistId2"
  });

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe('juice');

})

test('status of specified task should be changed', () => {

  const status = TaskStatuses.Completed

  const action = updateTaskAC("todolistId2", '2', {status},);

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

  let title = 'Barabulya of Crimea'
  const action = updateTaskAC("todolistId1", "3", {title});

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"][2].title).toBe('Barabulya of Crimea');
});

test('new array should be added when new todolist added', () => {

  const action = AddTodolist({
    addedDate: '',
    id: 'todolistId3',
    order: 0,
    title: "new todolist",
  });

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

  const action = RemoveTodolist("todolistId2");

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {

  const action = SetTodolists([
    {
      id: 'todolistId1', title: 'What to learn', addedDate: '',
      order: 0
    },
    {
      id: 'todolistId2', title: 'What to buy', addedDate: '',
      order: 0
    },
  ]);

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState["todolistId1"]).toStrictEqual([]);
  expect(endState["todolistId2"]).toStrictEqual([]);
});

test('tasks should be setted to state', () => {

  const action: ActionsType = setTasksAC("todolistId1", startState["todolistId1"]);

  const endState = tasksReducer({}, action);

  expect(Object.keys(endState).length).toBe(1);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][2].title).toBe('React');
});

