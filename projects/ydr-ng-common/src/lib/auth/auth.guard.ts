import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {
    if (!this.authService.token) {
      this.router.navigateByUrl('auth');
      return false;
    }

    return true;
  }
}
