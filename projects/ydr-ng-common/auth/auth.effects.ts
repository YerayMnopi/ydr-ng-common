import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService} from './auth.service';
import { LoginResponse } from './login-response';
import { BrowserService } from 'ydr-ng-common';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(AuthActions.Login),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((loginResponse: LoginResponse) => AuthActions.LoginSuccess(loginResponse)),
          catchError(error => of(AuthActions.LoginFailure({ error }))))
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly browserService: BrowserService
  ) {}

}
