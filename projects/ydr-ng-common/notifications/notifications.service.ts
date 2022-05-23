import { Injectable } from '@angular/core';
import { SseService, ApiService } from 'ydr-ng-common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from './notification';

@Injectable()
export class NotificationsService extends SseService<Notification[]>{

  private readonly endpoint = 'notifications';

  constructor(
    private readonly apiService: ApiService
  ) {
    super();
  }

  load(): Observable<Notification[]> {
    return this.apiService.get(`${this.endpoint}/to/me`);
  }

  receive(userId: string): Observable<Notification[]> {
    return this.apiService.composeRequestUrl(`${this.endpoint}/to/${userId}/subscribe`).pipe(
      switchMap((endpoint) => this.GetExchangeData(endpoint))
    );
  }

}
