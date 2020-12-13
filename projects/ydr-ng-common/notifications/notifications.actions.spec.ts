import * as fromNotification from './notifications.actions';

describe('loadNotifications', () => {
  it('should return an action', () => {
    expect(fromNotification.loadNotifications().type).toBe('[Notification] Load Notifications');
  });

  it('should return an success action', () => {
    expect(fromNotification.loadNotificationsSuccess({data: null}).type).toBe('[Notification] Load Notifications Success');
  });

  it('should return an failure action', () => {
    expect(fromNotification.loadNotificationsFailure({error: null}).type).toBe('[Notification] Load Notifications Failure');
  });
});
