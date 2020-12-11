import { Spied } from 'ydr-ng-common';
import { AuthService } from './auth.service';

export type AuthServiceMock = Spied<AuthService> & {changeToken: (value: string | null) => {}};

export const AuthServiceMockFactory = (): AuthServiceMock => {
  const authServiceMock = jasmine.createSpyObj(
    'AuthServiceMockFactory',
    ['login'],
  );

  return authServiceMock;
};
