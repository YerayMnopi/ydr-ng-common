import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from './auth.service';
import { AuthServiceMockFactory, AuthServiceMock } from './auth.service.mock';
import { Login, LoginFailure } from './auth.actions';
import { LoginPayload } from './login-payload';
import { provideMockStore } from '@ngrx/store/testing';
import { authInitialState } from './auth.reducer';
import { Action } from '@ngrx/store';
import { LoginSuccess } from './auth.actions';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useFactory: AuthServiceMockFactory},
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: authInitialState,
        }),
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('login', () => {
    const loginPayload: LoginPayload = {
      email: 'test',
      password: 'test'
    };
    const successResponse = {accessToken: 'test'};

    beforeEach(() => {
      actions$ = of(Login({payload: loginPayload}));
      authService.login.and.returnValue(of(successResponse));
    });

    it('should call the service', () => {
      effects.login$.subscribe();

      expect(authService.login).toHaveBeenCalledWith(loginPayload);
    });

    it('should return login success if ok', fakeAsync(() => {
      let result: Action;
      
      effects.login$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(LoginSuccess(successResponse));
    }));

    it('should return login failure if ko', fakeAsync(() => {
      let result: Action;
      const failureResponse = new Error('test');
      authService.login.and.returnValue(throwError(failureResponse));

      effects.login$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(LoginFailure({error: failureResponse}));
    }));
  });

});
