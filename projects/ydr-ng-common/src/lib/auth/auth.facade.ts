import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { Observable } from 'rxjs';
import { selectToken } from './auth.selectors';
import { LoginPayload } from './login-payload';
import { Login } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  token: Observable<string>;

  constructor(public store: Store<AuthState>) {
    this.token = store.pipe(select(selectToken))
  }

  login(loginPayload: LoginPayload) {
    this.store.dispatch(Login({payload: loginPayload}))
  }
}
