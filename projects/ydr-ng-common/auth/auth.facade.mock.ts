import { Spied } from 'ydr-ng-common';
import { AuthFacade } from './auth.facade';
import { of, Subject, BehaviorSubject } from 'rxjs';

export type AuthFacadeMock = Spied<AuthFacade> & {
  changeToken: (value: string | null) => {},
  sendLoginError: () => {}
};

export const AuthFacadeMockFactory = (): AuthFacadeMock => {
  const authServiceMock = jasmine.createSpyObj(
    'AuthFacadeMockFactory',
    ['login'],
  );

  authServiceMock.token = new BehaviorSubject('test');
  authServiceMock.loginError = new Subject();
  authServiceMock.changeToken = (value: string | null) => {
    authServiceMock.token.next(value);
  };
  authServiceMock.sendLoginError = () => {
    authServiceMock.loginError.next(new Error());
  };
  return authServiceMock;
};
