import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceMockFactory, AuthServiceMock } from './auth.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthServiceMock;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useFactory: AuthServiceMockFactory}
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if there is an access token', () => {
    authService.changeToken('token');

    expect(guard.canLoad({}, [])).toBe(true);
  });

  it('should redirect to /auth if there is not an access token', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    guard.canLoad({}, []);
    expect(routerSpy).toHaveBeenCalledWith('auth');
  });
});
