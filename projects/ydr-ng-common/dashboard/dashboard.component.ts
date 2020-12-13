import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NotificationsFacade } from 'ydr-ng-common/notifications';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  notifications: any[] = [];

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dashboardService: DashboardService,
    private readonly notificationsFacade: NotificationsFacade
  ) { }

  ngOnInit(): void {
    this.notificationsFacade.notifications.subscribe(
      notification => {
        this.notifications = this.notifications.concat([notification]);
        this.changeDetector.detectChanges();
      }
    );
    this.notificationsFacade.load();
  }

}
