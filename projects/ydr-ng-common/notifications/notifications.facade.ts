import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { State } from './notifications.reducer';
import { Observable } from 'rxjs';
import { selectAllNotifications } from './notifications.selectors';
import { loadNotifications, loadNotificationsFailure } from './notifications.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Notification } from './notification';

@Injectable()
export class NotificationsFacade {

  notifications: Observable<Notification[]>;
  loadError: Observable<Action>;

  constructor(
    public store: Store<State>,
    public actions: Actions
  ) {
    this.notifications = store.pipe(select(selectAllNotifications));
    this.loadError = this.actions.pipe(ofType(loadNotificationsFailure));
  }

  load() {
    this.store.dispatch(loadNotifications())
  }
}
