import { createFeatureSelector } from '@ngrx/store';
import * as fromNotification from './notifications.reducer';

export const selectNotificationState = createFeatureSelector<fromNotification.State>(
  fromNotification.notificationFeatureKey
);
