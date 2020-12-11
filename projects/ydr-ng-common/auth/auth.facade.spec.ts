import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthFacade } from './auth.facade';
import { authInitialState, authFeatureKey } from './auth.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginPayload } from './login-payload';
import { Login } from './auth.actions';

describe('AuthFacadeService', () => {
  let actions$: Observable<any>;
  let facade: AuthFacade;
  let storeSpy: jasmine.Spy;
  let fakeToken = {accessToken: 'test'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [authFeatureKey]: fakeToken
          }
        }),
        provideMockActions(() => actions$),
        AuthFacade
      ]
    });
    facade = TestBed.inject(AuthFacade);
    const store = TestBed.get(Store);
    storeSpy = spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('actions', () => {
    it('should dispatch login action', () => {
      const loginPayload: LoginPayload = {
        email: 'test',
        password: 'test'
      };
      
      facade.login(loginPayload);
    
      expect(storeSpy).toHaveBeenCalledWith(Login({payload: loginPayload}));
    });
  });

  describe('selectors', () => {
    it('should select token', fakeAsync(() => {
      let result: string;
      
      facade.token.subscribe(
        token => result = token
      );
      tick();

      expect(result).toBe(fakeToken.accessToken);
    }));
  });

});
