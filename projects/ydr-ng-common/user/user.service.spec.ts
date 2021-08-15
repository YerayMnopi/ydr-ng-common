import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService, ApiServiceMockFactory, Spied } from 'ydr-ng-common';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let apiService: Spied<ApiService>;
  const fakeAccessToken = 'token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService, useFactory: ApiServiceMockFactory},
        UserService
      ]
    });
    service = TestBed.inject(UserService);
    apiService = TestBed.get(ApiService);
    apiService.get.and.returnValue(of({accessToken: fakeAccessToken}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
  
    beforeEach(fakeAsync(() => {
      service.load().subscribe();
      tick();
    }));

    it('should load an user', () => {
      expect(apiService.get).toHaveBeenCalledWith(`${service.endpoint}/me`);
    });

  });

});
