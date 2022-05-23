import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { Observable } from 'rxjs';
import { selectToken } from './auth.selectors';
import { LoginPayload } from './login-payload';
import { Login, LoginFailure, LoginSuccess } from './auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { BrowserService } from 'ydr-ng-common';

@Injectable()
export class AuthFacade {

  token: Observable<string>;
  loginError: Observable<Action>;

  constructor(
    public store: Store<AuthState>,
    public actions: Actions,
    private readonly browserService: BrowserService
  ) {
    const loginResponse = this.browserService.retrieveFromLocalStorage('loginResponse');
    if (loginResponse) {
      this.store.dispatch(LoginSuccess(loginResponse))
    }
    this.token = store.pipe(select(selectToken));
    this.loginError = this.actions.pipe(ofType(LoginFailure));
  }

  login(loginPayload: LoginPayload) {
    this.store.dispatch(Login({payload: loginPayload}))
  }
}
