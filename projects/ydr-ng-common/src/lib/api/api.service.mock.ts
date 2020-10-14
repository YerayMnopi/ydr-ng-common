import { ApiService } from './api.service';
import { Spied } from '../testing/spied';

export const ApiServiceMockFactory = (): Spied<ApiService> =>
  jasmine.createSpyObj('MockApiService', [
    'get',
    'post',
  ]);
