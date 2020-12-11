import * as fromUser from './user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromUser.Load.type).toBe('[User] Load');
  });

  it('should return a success action', () => {
    expect(fromUser.LoadSuccess.type).toBe('[User] Load success');
  });

  it('should return a failure action', () => {
    expect(fromUser.LoadFailure.type).toBe('[User] Load failure');
  });
  
});
