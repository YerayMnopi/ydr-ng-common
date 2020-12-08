import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { UserState } from './user.reducer';
import { Observable } from 'rxjs';
import { selectUserState} from './user.selectors';
import { Load, LoadFailure } from './user.actions';
import { Actions, ofType } from '@ngrx/effects';
import { UserResponse } from './user-create.payload';

@Injectable()
export class UserFacade {

  user: Observable<UserResponse>;
  loadError: Observable<Action>;

  constructor(
    public store: Store<UserState>,
    public actions: Actions
  ) {
    this.user = store.pipe(select(selectUserState));
    this.loadError = this.actions.pipe(ofType(LoadFailure));
  }

  load() {
    this.store.dispatch(Load())
  }
}
