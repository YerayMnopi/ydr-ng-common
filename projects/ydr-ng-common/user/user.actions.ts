import { createAction, props } from '@ngrx/store';
import { UserResponse } from './user-create.payload';

export const Load = createAction(
  '[User] Load'
);

export const LoadSuccess = createAction(
  '[User]  Load success', 
  props<{ user: UserResponse }>()
);

export const LoadFailure = createAction(
  '[User]  Load failure', 
  props<{ error: {} }>()
);
