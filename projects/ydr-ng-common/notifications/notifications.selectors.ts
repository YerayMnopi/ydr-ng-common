import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNotification from './notifications.reducer';

export const selectNotificationState = createFeatureSelector<fromNotification.State>(
  fromNotification.notificationFeatureKey
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromNotification.adapter.getSelectors();

export const selectAllNotifications = createSelector(
  selectNotificationState,
  selectAll
);