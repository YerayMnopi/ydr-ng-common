import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { ApiService, ApiServiceMockFactory, Spied } from 'ydr-ng-common';
import { of } from 'rxjs';
import { notificationMockFactory } from './notification.mock';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let apiService: Spied<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService, useFactory: ApiServiceMockFactory},
        NotificationsService
      ]
    });
    service = TestBed.inject(NotificationsService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('receive', () => {
    it('should receive notifications from the server', () => {
      const endpoint = 'test';
      const spy = spyOn(service, 'GetExchangeData');
      spy.and.returnValue(
        of([notificationMockFactory()]
      ));
      apiService.composeRequestUrl.and.returnValue(of(endpoint));

      service.receive().subscribe();

      expect(spy).toHaveBeenCalledWith(endpoint);
    });
  });
});
