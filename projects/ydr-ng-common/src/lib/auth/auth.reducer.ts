import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { LoginResponse } from './login-response';

export const authFeatureKey = 'auth';

export interface AuthState extends LoginResponse {}

export const authInitialState: AuthState = {
  accessToken: null
};


export const reducer = createReducer(
  authInitialState,
  on(AuthActions.LoginSuccess,
    (state, action) => {
      return {...state, ...{accessToken: action.accessToken}}
    }
  ),
);
