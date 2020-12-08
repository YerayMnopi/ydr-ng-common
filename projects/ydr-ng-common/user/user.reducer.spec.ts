import { reducer, userInitialState } from './user.reducer';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(userInitialState, action);

      expect(result).toBe(userInitialState);
    });
  });
});
