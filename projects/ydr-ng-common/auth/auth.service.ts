import { Injectable } from '@angular/core';
import { ApiService } from 'ydr-ng-common';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response';
import { LoginPayload } from './login-payload';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private privateToken: string | null = null;

  readonly endpoint = 'auth';

  constructor(
    private readonly apiService: ApiService
  ) { }

  get token(): string | null {
    return this.privateToken;
  }

  login(loginPayload: LoginPayload): Observable<LoginResponse> {
    return this.apiService.post(this.endpoint, loginPayload)
      .pipe(
        tap((loginResponse: LoginResponse) => {
          this.privateToken = loginResponse.accessToken || null;
        })
      );
  }
}
