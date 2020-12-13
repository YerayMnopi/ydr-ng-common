import { createReducer, on } from '@ngrx/store';
import { Notification } from './notification';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { loadNotificationsSuccess } from './notifications.actions';

export const notificationFeatureKey = 'notification';

export interface State extends EntityState<Notification> {
  selectedNotificationId: string;
}
 
export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>();

export const initialState: State = adapter.getInitialState({
  selectedNotificationId: null,
});

export const reducer = createReducer(
  initialState,
  on(loadNotificationsSuccess,
    (state, action) => adapter.addMany(action.data, state)
  )
);
