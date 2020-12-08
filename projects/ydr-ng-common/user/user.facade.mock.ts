import { Spied } from 'ydr-ng-common';
import { UserFacade } from './user.facade';
import { BehaviorSubject, Subject } from 'rxjs';
import { userResponseMockFactory } from './user.mock';
import { UserResponse } from './user-create.payload';

export type UserFacadeMock = Spied<UserFacade> & {
  changeUser: (value: UserResponse | null) => {}
  sendLoadError: () => {}
};

export const UserFacadeMockFactory = (): UserFacadeMock => {
  const userServiceMock = jasmine.createSpyObj(
    'userhFacadeMockFactory',
    ['load'],
  );

  userServiceMock.user = new BehaviorSubject(userResponseMockFactory());
  userServiceMock.loadError = new Subject();
  userServiceMock.changeUser = (value: UserResponse | null) => {
    userServiceMock.user.next(value);
  };
  userServiceMock.sendLoadError = () => {
    userServiceMock.loadError.next(new Error());
  };
  return userServiceMock;
};
