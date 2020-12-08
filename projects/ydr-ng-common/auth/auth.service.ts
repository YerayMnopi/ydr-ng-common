import { Injectable } from '@angular/core';
import { ApiService } from 'ydr-ng-common';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response';
import { LoginPayload } from './login-payload';

@Injectable()
export class AuthService {

  readonly endpoint = 'auth';

  constructor(
    private readonly apiService: ApiService
  ) { }

  login(loginPayload: LoginPayload): Observable<LoginResponse> {
    return this.apiService.post(this.endpoint, loginPayload);
  }
}
