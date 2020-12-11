import { reducer, authInitialState } from './auth.reducer';
import { LoginSuccess } from './auth.actions';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(authInitialState, action);

      expect(result).toBe(authInitialState);
    });
  });

  describe('Login success action', () => {
    it('should return the new state', () => {
      const token = {accessToken: 'test'};

      const action = LoginSuccess(token);

      const result = reducer(authInitialState, action);

      expect(result).toEqual(token);
    });
  });
});
