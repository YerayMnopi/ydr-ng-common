import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UserFacade } from './user.facade';
import { userFeatureKey } from './user.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Load } from './user.actions';
import { userResponseMockFactory } from './user.mock';
import { UserResponse } from './user-create.payload';

describe('UserFacadeService', () => {
  let actions$: Observable<any>;
  let facade: UserFacade;
  let storeSpy: jasmine.Spy;
  const fakeUser = userResponseMockFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [userFeatureKey]: fakeUser
          }
        }),
        provideMockActions(() => actions$),
        UserFacade
      ]
    });
    facade = TestBed.inject(UserFacade);
    const store = TestBed.get(Store);
    storeSpy = spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('actions', () => {
    it('should dispatch load action', () => {

      facade.load();
    
      expect(storeSpy).toHaveBeenCalledWith(Load());
    });
  });

  describe('selectors', () => {
    it('should select user', fakeAsync(() => {
      let result: UserResponse;
      
      facade.user.subscribe(
        user => result = user
      );
      tick();

      expect(result).toBe(fakeUser);
    }));
  });

});
