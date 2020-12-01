import { Spied } from '../testing/spied';
import { AuthFacade } from './auth.facade';
import { of } from 'rxjs';

export type AuthFacadeMock = Spied<AuthFacade> & {changeToken: (value: string | null) => {}};

export const AuthFacadeMockFactory = (): AuthFacadeMock => {
  const authServiceMock = jasmine.createSpyObj(
    'AuthFacadeMockFactory',
    ['login'],
  );

  authServiceMock.token = of('test');
  authServiceMock.loginError = of(new Error());
  authServiceMock.changeToken = (value: string | null) => {
    authServiceMock.token = of(value);
  };

  return authServiceMock;
};
