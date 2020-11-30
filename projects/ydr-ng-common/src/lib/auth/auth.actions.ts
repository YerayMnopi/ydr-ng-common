import { createAction, props } from '@ngrx/store';
import { LoginPayload } from './login-payload';

export const Login = createAction(
  '[Auth] Login', 
  props<{payload: LoginPayload}>()
);

export const loginSuccess = createAction(
  '[Auth]  Login success', 
  props<{ accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth]  Login failure', 
  props<{ error: {} }>()
);
