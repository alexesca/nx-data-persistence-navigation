import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromTodosList from './todo-list.reducer';
import * as TodosListSelectors from './todo-list.selectors';

@Injectable()
export class TodoListFacade {
  loaded$ = this.store.pipe(select(TodosListSelectors.getTodoListLoaded));
  allTodosList$ = this.store.pipe(select(TodosListSelectors.getAllTodosList));
  selectedTodosList$ = this.store.pipe(select(TodosListSelectors.getSelected));

  constructor(private store: Store<fromTodosList.TodoListPartialState>) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
