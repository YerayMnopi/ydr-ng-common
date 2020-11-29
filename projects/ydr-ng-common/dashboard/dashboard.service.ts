import { Injectable } from '@angular/core';
import { SseService } from 'ydr-ng-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends SseService {

  constructor() {
    super('http://localhost:3001/notifications/sse');
  }

  getNotifications(): Observable<Notification> {
    return this.GetExchangeData();
  }
}
