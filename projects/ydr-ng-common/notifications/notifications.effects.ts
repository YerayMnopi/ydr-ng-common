import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as NotificationActions from './notifications.actions';
import { NotificationsService } from './notifications.service';



@Injectable()
export class NotificationEffects {

  loadNotifications$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(NotificationActions.loadNotifications),
      concatMap(() =>
        this.notificationsService.receive().pipe(
          map(data => NotificationActions.loadNotificationsSuccess({ data })),
          catchError(error => of(NotificationActions.loadNotificationsFailure({ error }))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly notificationsService: NotificationsService
  ) {}

}
