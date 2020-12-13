import { reducer, initialState } from './notifications.reducer';
import { loadNotificationsSuccess } from './notifications.actions';
import { notificationMockFactory } from './notification.mock';

describe('Notification Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Load success action', () => {
    it('should return the new state', () => {
      const notification = notificationMockFactory();

      const action = loadNotificationsSuccess({data: [notification]});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState, 
        ...{
          ids: [notification.id],
          entities: {
            [notification.id]: notification
          },
        }
      });
    });
  });
});
