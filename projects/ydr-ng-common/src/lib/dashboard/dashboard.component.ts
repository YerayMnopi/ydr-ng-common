import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from './dashboard.service';

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
    private readonly dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getNotifications().subscribe(
      notification => {
        this.notifications = this.notifications.concat([notification]);
        this.changeDetector.detectChanges();
      }
    );
  }

}
