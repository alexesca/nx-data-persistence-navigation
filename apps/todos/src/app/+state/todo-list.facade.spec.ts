import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TodoListEntity } from './todo-list.models';
import { TodoListEffects } from './todo-list.effects';
import { TodoListFacade } from './todo-list.facade';
import * as TodoListActions from './todo-list.actions';

import {
  TODO_LIST_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './todo-list.reducer';

interface TestSchema {
  todosList: State;
}

describe('TodoListFacade', () => {
  let facade: TodoListFacade;
  let store: Store<TestSchema>;
  const createTodosListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TodoListEntity);

  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TODO_LIST_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TodoListEffects]),
        ],
        providers: [TodoListFacade],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TodoListFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allTodosList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(TodoListActions.loadTodoList());

        list = await readFirst(facade.allTodosList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTodosListSuccess` to manually update list
     */
    it('allTodosList$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allTodosList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          TodoListActions.loadTodoListSuccess({
            todosList: [
              createTodosListEntity('AAA'),
              createTodosListEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allTodosList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
