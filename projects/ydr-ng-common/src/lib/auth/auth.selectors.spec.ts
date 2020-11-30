import * as fromAuth from './auth.reducer';
import { selectToken } from './auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const fakeToken = 'test';

    const result = selectToken({
      [fromAuth.authFeatureKey]: {
        accessToken: fakeToken
      }
    });

    expect(result).toEqual(fakeToken);
  });
});
