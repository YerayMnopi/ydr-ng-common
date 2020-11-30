import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService} from './auth.service';
import { LoginResponse } from './login-response';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.Login),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((loginResponse: LoginResponse) => AuthActions.loginSuccess(loginResponse)),
          catchError(error => of(AuthActions.loginFailure({ error }))))
      )
    );
  });



  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

}
