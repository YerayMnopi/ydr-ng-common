import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthFacade } from './auth.facade';
import { authInitialState } from './auth.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

describe('AuthFacadeService', () => {
  let actions$: Observable<any>;
  let service: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: authInitialState
        }),
        provideMockActions(() => actions$),
        AuthFacade
      ]
    });
    service = TestBed.inject(AuthFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
