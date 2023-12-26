import {tasksReducer, TasksStateType} from "features/TodosList/model/tasks/slice/tasksSlice";
import {TodolistBLLType, todolistsReducer, todosThunks} from "features/TodosList/model/todolists/slice/todolistsSlice";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistBLLType> = [];

  const action = todosThunks.createTodolist.fulfilled({
    todolist:
      {
        addedDate: '',
        id: 'todolistId3',
        order: 0,
        title: "new todolist",
      }
  }, '', "new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

