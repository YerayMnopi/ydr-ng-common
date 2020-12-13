import { Spied } from 'ydr-ng-common';
import { NotificationsService } from './notifications.service';

export type NotificationsServiceMock = Spied<NotificationsService>;

export const notificationsServiceMockFactory = (): NotificationsServiceMock => {
  const notificationsServiceMock = jasmine.createSpyObj(
    'LoadServiceMockFactory',
    ['receive'],
  );
  return notificationsServiceMock;
};
