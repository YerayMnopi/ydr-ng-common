import * as fromNotification from './notification.reducer';
import { selectNotificationState } from './notification.selectors';

describe('Notification Selectors', () => {
  it('should select the feature state', () => {
    const result = selectNotificationState({
      [fromNotification.notificationFeatureKey]: fromNotification.initialState
    });

    expect(result).toEqual(fromNotification.initialState);
  });
});
