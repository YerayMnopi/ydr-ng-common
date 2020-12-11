import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { UserEffects } from './user.effects';
import { UserService } from './user.service';
import { UserServiceMockFactory, UserServiceMock } from './user.service.mock';
import { provideMockStore } from '@ngrx/store/testing';
import { userInitialState } from './user.reducer';
import { Load, LoadSuccess, LoadFailure } from './user.actions';
import { Action } from '@ngrx/store';
import { userResponseMockFactory } from '../user/user.mock';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: UserServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useFactory: UserServiceMockFactory},
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: userInitialState,
        }),
      ]
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('load', () => {
    const successResponse = userResponseMockFactory();

    beforeEach(() => {
      actions$ = of(Load());
      userService.load.and.returnValue(of(successResponse));
    });

    it('should call the service', () => {
      effects.load$.subscribe();

      expect(userService.load).toHaveBeenCalled();
    });

    it('should return load success if ok', fakeAsync(() => {
      let result: Action;
      
      effects.load$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(LoadSuccess({user: successResponse}));
    }));

    it('should return load failure if ko', fakeAsync(() => {
      let result: Action;
      const failureResponse = new Error('test');
      userService.load.and.returnValue(throwError(failureResponse));

      effects.load$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(LoadFailure({error: failureResponse}));
    }));
  });

});
