import {TaskPriorities, TaskStatuses} from "features/TodosList/api/tasks/tasks.api.types";
import {tasksReducer, TasksStateType, tasksThunks} from 'features/TodosList/model/tasks/slice/tasksSlice';
import {TodoType} from "features/TodosList/api/todolists/todolists.api.types";
import {todosThunks} from "features/TodosList/model/todolists/slice/todolistsSlice";


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

test('correct Tasks should be deleted from correct array', () => {


  const action = tasksThunks.removeTask.fulfilled(
    {todolistID: "todolistId2", taskID: "2"}, '', {todolistID: "todolistId2", taskID: "2"});

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    "todolistId1": [
      {
        id: "1", title: "CSS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle'
      },
      {
        id: "2", title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle'
      },
      {
        id: "3", title: "React", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle'
      }
    ],
    "todolistId2": [
      {
        id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle'
      },
      {
        id: "3", title: "tea", status: TaskStatuses.New, addedDate: '', deadline: '',
        description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: '', taskItemStatus: 'idle'
      }
    ]
  });
});


test('correct Tasks should be added to correct array', () => {
  const action = tasksThunks.addTask.fulfilled({
    task: {
      addedDate: '',
      deadline: '',
      description: '',
      id: 'bla',
      order: 0,
      priority: TaskPriorities.Low,
      startDate: '',
      status: TaskStatuses.New,
      title: 'juice',
      todoListId: "todolistId2"
    }
  }, 'someRequestId', {
    todolistId: 'todolistId2',
    title: 'juice'
  });

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe('juice');
  expect(endState["todolistId2"][0].taskItemStatus).toBe('idle');

})

test('status of specified Tasks should be changed', () => {

  const status = TaskStatuses.Completed

  const action = tasksThunks.updateTask.fulfilled(
    {todolistID: "todolistId2", taskID: '2', changesForApiModel: {status}}, '',
    {todolistID: "todolistId2", taskID: '2', changesForApiModel: {status}}
  );

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified Tasks should be changed', () => {

  let title = 'Barabulya of Crimea'
  const action = tasksThunks.updateTask.fulfilled(
    {todolistID: "todolistId1", taskID: '3', changesForApiModel: {title}}, '',
    {todolistID: "todolistId1", taskID: '3', changesForApiModel: {title}}
  );

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"][2].title).toBe('Barabulya of Crimea');
});

test('new array should be added when new todolist added', () => {

  const action = todosThunks.createTodolist.fulfilled({
    todolist: {
      addedDate: '',
      id: 'todolistId3',
      order: 0,
      title: "new todolist",
    }
  }, '', "new todolist");

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

  const action = todosThunks.removeTodolist.fulfilled({id: "todolistId2"}, '', "todolistId2");

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {
  const todolists: TodoType[] = [
    {
      id: 'todolistId1', title: 'What to learn', addedDate: '',
      order: 0
    },
    {
      id: 'todolistId2', title: 'What to buy', addedDate: '',
      order: 0
    },
  ]
  const action = todosThunks.fetchTodolists.fulfilled({
    todolists
  }, '');

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState["todolistId1"]).toStrictEqual([]);
  expect(endState["todolistId2"]).toStrictEqual([]);
});

test('Tasks should be setted to state', () => {

  const action = tasksThunks.fetchTasks.fulfilled(
    {todolistID: "todolistId1", tasks: startState["todolistId1"]}, 'someRequestId', "todolistId1");

  const endState = tasksReducer({}, action);

  expect(Object.keys(endState).length).toBe(1);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][2].title).toBe('React');
});

