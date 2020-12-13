import { Spied } from 'ydr-ng-common';
import { NotificationsFacade } from './notifications.facade';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from './notification';
import { notificationMockFactory } from './notification.mock';

export type NotificationsFacadeMock = Spied<NotificationsFacade> & {
  changeUser: (value: Notification | null) => {}
  sendLoadError: () => {}
};

export const NotificationsFacadeMockFactory = (): NotificationsFacadeMock => {
  const notificationsServiceMock = jasmine.createSpyObj(
    'userhFacadeMockFactory',
    ['load'],
  );

  notificationsServiceMock.notifications = new BehaviorSubject([notificationMockFactory()]);
  notificationsServiceMock.loadError = new Subject();
  notificationsServiceMock.changeNotifications = (value: Notification | null) => {
    notificationsServiceMock.notifications.next(value);
  };
  notificationsServiceMock.sendLoadError = () => {
    notificationsServiceMock.loadError.next(new Error());
  };
  return notificationsServiceMock;
};
