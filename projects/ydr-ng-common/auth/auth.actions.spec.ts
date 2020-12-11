import * as fromAuth from './auth.actions';

describe('Login', () => {
  it('should return an action', () => {
    expect(fromAuth.Login.type).toBe('[Auth] Login');
  });

  it('should return a success action', () => {
    expect(fromAuth.LoginSuccess.type).toBe('[Auth] Login success');
  });

  it('should return a failure action', () => {
    expect(fromAuth.LoginFailure.type).toBe('[Auth] Login failure');
  });
  
});

