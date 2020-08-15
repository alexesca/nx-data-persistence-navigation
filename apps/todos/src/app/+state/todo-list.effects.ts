import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';

import { of } from 'rxjs';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { loadTodoListSuccess } from './todo-list.actions';

@Injectable()
export class TodoListEffects {

  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(TodoListComponent, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          debugger;
          console.log(activatedRouteSnapshot.params);
          return of(
            loadTodoListSuccess({ todosList: [{ id: "123" }] })
          )
        },
        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we csan log and error here and return null
          // we can also navigate back
          return null;
        },
      })
    )
  );

  constructor(private actions$: Actions) { }
}
