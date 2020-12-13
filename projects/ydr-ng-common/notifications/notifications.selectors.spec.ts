import * as fromNotification from './notifications.reducer';
import { selectNotificationState } from './notifications.selectors';

describe('Notification Selectors', () => {
  it('should select the feature state', () => {
    const result = selectNotificationState({
      [fromNotification.notificationFeatureKey]: fromNotification.initialState
    });

    expect(result).toEqual(fromNotification.initialState);
  });
});
