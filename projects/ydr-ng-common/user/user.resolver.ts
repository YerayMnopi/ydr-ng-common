import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserResponse } from './user-create.payload';
import { Observable } from 'rxjs';
import { UserFacade } from './user.facade';
import { map, first } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<UserResponse> {

  constructor(
    private readonly userFacade: UserFacade
  ) { }

  resolve(): Observable<UserResponse> {
    return this.userFacade.user.pipe(
      map(
        user => {
          if (!user) {
            this.userFacade.load();
          }

          return user;
        }
      ),
      first(user => !!user)
    );
  }

}
