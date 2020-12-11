import { reducer, userInitialState } from './user.reducer';
import { LoadSuccess } from './user.actions';
import { userResponseMockFactory } from './user.mock';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(userInitialState, action);

      expect(result).toBe(userInitialState);
    });
  });

  describe('Load success action', () => {
    it('should return the new state', () => {
      const user = userResponseMockFactory();

      const action = LoadSuccess({user: user});

      const result = reducer(userInitialState, action);

      expect(result).toEqual(user);
    });
  });
});
