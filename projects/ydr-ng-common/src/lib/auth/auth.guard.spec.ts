import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthFacade } from './auth.facade';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthFacadeMockFactory, AuthFacadeMock } from './auth.facade.mock';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authFacade: AuthFacadeMock;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AuthFacade, useFactory: AuthFacadeMockFactory},
        AuthGuard
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authFacade = TestBed.get(AuthFacade);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if there is an access token', fakeAsync(() => {
    let canLoad: boolean;

    guard.canLoad({}, []).subscribe(
      result => canLoad = result
    );
    tick();

    expect(canLoad).toBe(true);
  }));

  it('should redirect to /auth if there is not an access token', fakeAsync(() => {
    authFacade.changeToken(null);
    const routerSpy = spyOn(router, 'navigateByUrl');

    guard.canLoad({}, []).subscribe(() => {});
    tick();

    expect(routerSpy).toHaveBeenCalledWith('auth');
  }));
});
