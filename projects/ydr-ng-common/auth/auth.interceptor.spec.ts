import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthServiceMock } from './auth.service.mock';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthFacade } from './auth.facade';
import { AuthFacadeMockFactory } from './auth.facade.mock';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authFacade: AuthServiceMock;
  const url = `http://test.com/token`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {provide: AuthFacade, useFactory: AuthFacadeMockFactory},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    authFacade = TestBed.get(AuthFacade);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add bearer if there is a token', fakeAsync(() => {
    httpClient.get(url).subscribe(res => {});
    tick();
    const request = httpMock.expectOne(url).request;

    expect(request.headers.get('Authorization')).toBeTruthy();
  }));

  it('should not add bearer if there is no token', fakeAsync(() => {
    authFacade.changeToken(null);
    
    httpClient.get(url).subscribe(res => {});
    tick();
    const request = httpMock.expectOne(url).request;

    expect(request.headers.get('Authorization')).toBeFalsy();
  }));


});

