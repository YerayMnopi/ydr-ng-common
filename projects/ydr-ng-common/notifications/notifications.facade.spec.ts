import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NotificationsFacade } from './notifications.facade';
import { notificationFeatureKey, initialState } from './notifications.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadNotifications } from './notifications.actions';
import { notificationMockFactory } from './notification.mock';
import { Notification } from './notification';

describe('NotificationsFacadeService', () => {
  let actions$: Observable<any>;
  let facade: NotificationsFacade;
  let storeSpy: jasmine.Spy;
  const fakeNotification = notificationMockFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [notificationFeatureKey]: {
              ...initialState,
              ...{
                ids: [fakeNotification.id],
                entities: {
                  [fakeNotification.id]: fakeNotification
                }
              }
            }
          }
        }),
        provideMockActions(() => actions$),
        NotificationsFacade
      ]
    });
    facade = TestBed.inject(NotificationsFacade);
    const store = TestBed.get(Store);
    storeSpy = spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('actions', () => {
    it('should dispatch load action', () => {

      facade.load();
    
      expect(storeSpy).toHaveBeenCalledWith(loadNotifications());
    });
  });

  describe('selectors', () => {
    it('should select notifications', fakeAsync(() => {
      let result: Notification[];
      
      facade.notifications.subscribe(
        notifications => result = notifications
      );
      tick();

      expect(result).toEqual([fakeNotification]);
    }));
  });

});
