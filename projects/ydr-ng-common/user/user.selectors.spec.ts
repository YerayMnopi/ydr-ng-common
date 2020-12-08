import * as fromUser from './user.reducer';
import { selectUserState } from './user.selectors';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const fakeUser = null;

    const result = selectUserState({
      [fromUser.userFeatureKey]: null
    });

    expect(result).toEqual(fakeUser);
  });
});
