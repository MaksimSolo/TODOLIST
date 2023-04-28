import {tasksReducer, TasksStateType} from "app/store/reducers/tasks-reducer";
import {TodolistBLLType, todolistsReducer, todosActions} from "app/store/reducers/todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistBLLType> = [];

  const action = todosActions.addTodolist({
    todolist:
      {
        addedDate: '',
        id: 'todolistId3',
        order: 0,
        title: "new todolist",
      }
  });

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

