import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './user.actions';
import { UserService} from './user.service';
import { UserResponse } from './user-create.payload';



@Injectable()
export class UserEffects {

  load$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserActions.Load),
      concatMap((action) =>
        this.userService.load().pipe(
          map((loadResponse: UserResponse) => UserActions.LoadSuccess({user: loadResponse})),
          catchError(error => of(UserActions.LoadFailure({ error }))))
      )
    );
  });



  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {}

}
