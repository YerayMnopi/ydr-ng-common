import { reducer, authInitialState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(authInitialState, action);

      expect(result).toBe(authInitialState);
    });
  });
});
