import * as fromAuth from './auth.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromAuth.Login.type).toBe('[Auth] Login');
  });
});
