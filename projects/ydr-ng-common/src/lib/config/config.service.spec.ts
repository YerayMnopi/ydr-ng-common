import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT } from '../environment/environment.module';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ENVIRONMENT, useValue: ''}
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
