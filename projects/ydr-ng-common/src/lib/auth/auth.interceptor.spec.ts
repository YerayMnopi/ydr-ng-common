import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthServiceMockFactory, AuthServiceMock } from './auth.service.mock';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defaultConfig } from '../config/config.constants';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthServiceMock;
  const url = `${defaultConfig.apiUrl}/token`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {provide: AuthService, useFactory: AuthServiceMockFactory},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not add bearer if there is no token', fakeAsync(() => {
    let response;

    httpClient.get(url).subscribe(res => (response = res));
    tick();
    const request = httpMock.expectOne(url).request;

    expect(request.headers.get('Authorization')).toBeFalsy();
  }));

  it('should add bearer if there is a token', fakeAsync(() => {
    let response;
    authService.changeToken('token');

    httpClient.get(url).subscribe(res => (response = res));
    tick();
    const request = httpMock.expectOne(url).request;

    expect(request.headers.get('Authorization')).toBeTruthy();
  }));
});

