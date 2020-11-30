import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthFacade } from './auth.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.authFacade.token.pipe(
      map(token => {
        if (!token) {
          this.router.navigateByUrl('auth');
          return false;
        }
        return true;
      })
    );
  }
}
