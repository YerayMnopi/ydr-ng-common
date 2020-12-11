import { createAction, props } from '@ngrx/store';
import { LoginPayload } from './login-payload';

export const Login = createAction(
  '[Auth] Login', 
  props<{payload: LoginPayload}>()
);

export const LoginSuccess = createAction(
  '[Auth] Login success', 
  props<{ accessToken: string }>()
);

export const LoginFailure = createAction(
  '[Auth] Login failure', 
  props<{ error: {} }>()
);
