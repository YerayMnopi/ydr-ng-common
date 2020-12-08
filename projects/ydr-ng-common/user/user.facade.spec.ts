import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UserFacade } from './user.facade';
import { userInitialState } from './user.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

describe('UserFacadeService', () => {
  let actions$: Observable<any>;
  let service: UserFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: userInitialState
        }),
        provideMockActions(() => actions$),
        UserFacade
      ]
    });
    service = TestBed.inject(UserFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
