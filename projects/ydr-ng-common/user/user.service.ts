import { Injectable } from '@angular/core';
import { ApiService } from 'ydr-ng-common';
import { Observable } from 'rxjs';
import { UserResponse } from './user-create.payload';

@Injectable()
export class UserService {

  readonly endpoint = 'users';

  constructor(
    private readonly apiService: ApiService
  ) { }

  load(): Observable<UserResponse> {
    return this.apiService.get(`${this.endpoint}/me`);
  }
}
