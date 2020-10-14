import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Spied } from '../testing/spied';
import { ConfigService } from '../config/config.service';
import { ConfigServiceMockFactory } from '../config/config.service.mock';
import { of } from 'rxjs';
import { defaultConfig } from '../config/config.constants';

export const httpClientMockFactory = () =>
  jasmine.createSpyObj('HttpClientMock', [
    'get',
    'post',
  ]);

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: Spied<HttpClient>;
  let configService: Spied<ConfigService>;
  const fakeEndpoint = 'test';
  const fakeBody = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useFactory: httpClientMockFactory},
        {provide: ConfigService, useFactory: ConfigServiceMockFactory},
      ]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.get(HttpClient);
    httpClient.get.and.returnValue(of(null));
    httpClient.post.and.returnValue(of(null));
    configService = TestBed.get(ConfigService);
    configService.get.and.returnValue(of(defaultConfig))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compose request url', fakeAsync(() => {
    let requestUrl: string;
    service.composeRequestUrl(fakeEndpoint).subscribe(
      url => requestUrl = url
    )

    expect(requestUrl).toBe(`${service.apiUrl}/${fakeEndpoint}`);
  }));

  it('should execture an http get request', fakeAsync(() => {
    let response;
    service.get(fakeEndpoint).subscribe(
      (res) => response = res
    );
    tick();
    expect(httpClient.get).toHaveBeenCalledWith(`${service.apiUrl}/${fakeEndpoint}`, undefined);
  }));

  it('should execture an http post request', fakeAsync(() => {
    let response;
    service.post(fakeEndpoint, fakeBody).subscribe(
      (res) => response = res
    );
    tick();
    expect(httpClient.post).toHaveBeenCalledWith(`${service.apiUrl}/${fakeEndpoint}`, fakeBody);
  }));
});
