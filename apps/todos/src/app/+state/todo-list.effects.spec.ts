import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TodoListEffects } from './todo-list.effects';
import * as TodoListActions from './todo-list.actions';

describe('TodoListEffects', () => {
  let actions: Observable<any>;
  let effects: TodoListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TodoListEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(TodoListEffects);
  });

  describe('loadTodosList$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TodoListActions.loadTodoList() });

      const expected = hot('-a-|', {
        a: TodoListActions.loadTodoListSuccess({ todosList: [] }),
      });

      expect(effects.loadTodo$).toBeObservable(expected);
    });
  });
});
