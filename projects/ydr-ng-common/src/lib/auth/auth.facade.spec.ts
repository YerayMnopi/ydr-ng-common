import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthFacade } from './auth.facade';
import { authInitialState } from './auth.reducer';

describe('Auth.FacadeService', () => {
  let service: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: authInitialState
        })
      ]
    });
    service = TestBed.inject(AuthFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
