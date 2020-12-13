import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { NotificationEffects } from './notification.effects';
import { NotificationsService } from './notifications.service';
import { notificationMockFactory } from './notification.mock';
import { NotificationsServiceMock, notificationsServiceMockFactory } from './notifications.service.mock';
import { loadNotifications, loadNotificationsSuccess, loadNotificationsFailure } from './notification.actions';
import { Action } from '@ngrx/store';

describe('NotificationEffects', () => {
  let actions$: Observable<any>;
  let effects: NotificationEffects;
  let notificationsService: NotificationsServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationEffects,
        provideMockActions(() => actions$),
        {provide: NotificationsService, useFactory: notificationsServiceMockFactory}
      ]
    });

    effects = TestBed.inject(NotificationEffects);
    notificationsService = TestBed.get(NotificationsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('load', () => {
    const successResponse = [notificationMockFactory()];

    beforeEach(() => {
      actions$ = of(loadNotifications());
      notificationsService.receive.and.returnValue(of(successResponse));
    });

    it('should call the service', () => {
      effects.loadNotifications$.subscribe();

      expect(notificationsService.receive).toHaveBeenCalled();
    });

    it('should return load success if ok', fakeAsync(() => {
      let result: Action;
      
      effects.loadNotifications$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(loadNotificationsSuccess({data: successResponse}));
    }));

    it('should return load failure if ko', fakeAsync(() => {
      let result: Action;
      const failureResponse = new Error('test');
      notificationsService.receive.and.returnValue(throwError(failureResponse));

      effects.loadNotifications$.subscribe((effectResponse) => result = effectResponse);
      tick();

      expect(result).toEqual(loadNotificationsFailure({error: failureResponse}));
    }));
  });

});
