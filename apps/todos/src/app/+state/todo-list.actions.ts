import { createAction, props } from '@ngrx/store';
import { TodoListEntity } from './todo-list.models';

export const loadTodoList = createAction('[TodosList] Load TodosList');

export const loadTodoListSuccess = createAction(
  '[TodoList] Load TodosList Success',
  props<{ todosList: TodoListEntity[] }>()
);

export const loadTodoListFailure = createAction(
  '[TodoList] Load TodosList Failure',
  props<{ error: any }>()
);
