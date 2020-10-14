import { Spied } from '../testing/spied';
import { ConfigService } from './config.service';

export const ConfigServiceMockFactory = (): Spied<ConfigService> =>
  jasmine.createSpyObj('MockApiService', [
    'get',
  ]);
