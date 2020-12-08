import { Spied } from 'ydr-ng-common';
import { UserService } from './user.service';

export type UserServiceMock = Spied<UserService>;

export const UserServiceMockFactory = (): UserServiceMock => {
  const userServiceMock = jasmine.createSpyObj(
    'UserServiceMockFactory',
    ['load'],
  );
  return userServiceMock;
};
