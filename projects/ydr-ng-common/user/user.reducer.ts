import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserResponse } from './user-create.payload';

export const userFeatureKey = 'user';

export interface UserState extends UserResponse {}

export const userInitialState: UserState = null;


export const reducer = createReducer(
  userInitialState,
  on(UserActions.LoadSuccess,
    (state, action) => {
      return {...state, ...action.user}
    }
  ),
);
