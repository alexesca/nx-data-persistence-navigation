import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoListComponent } from './todo-list.component'
import * as fromTodosList from '../+state/todo-list.reducer';
import { TodoListEffects } from '../+state/todo-list.effects';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTodosList.TODO_LIST_FEATURE_KEY,
      fromTodosList.reducer
    ),
    EffectsModule.forFeature([TodoListEffects]),
  ]
})
export class TodoListModule { }
