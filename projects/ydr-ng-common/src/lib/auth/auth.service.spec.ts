import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from '../api/api.service';
import { ApiServiceMockFactory } from '../api/api.service.mock';
import { LoginPayload } from './login-payload';
import { of } from 'rxjs';
import { Spied } from '../testing/spied';

describe('AuthService', () => {
  let service: AuthService;
  let apiService: Spied<ApiService>;
  const fakeAccessToken = 'token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService, useFactory: ApiServiceMockFactory}
      ]
    });
    service = TestBed.inject(AuthService);
    apiService = TestBed.get(ApiService);
    apiService.post.and.returnValue(of({accessToken: fakeAccessToken}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('token', () => {
    const fakeUser: LoginPayload = {
      email: 'test',
      password: 'test'
    };

    beforeEach(fakeAsync(() => {
      service.login(fakeUser).subscribe();
      tick();
    }));

    it('should obtain a token', () => {
      expect(apiService.post).toHaveBeenCalledWith(service.endpoint, fakeUser);
    });

    it('should store the access token', () => {
      expect(service.token).toBe(fakeAccessToken);
    });
  });

});
