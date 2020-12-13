import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from './notifications.service';
import { StoreModule } from '@ngrx/store';
import * as fromNotification from './notifications.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './notifications.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNotification.notificationFeatureKey, fromNotification.reducer),
    EffectsModule.forFeature([NotificationEffects])
  ],
  providers: [
    NotificationsService
  ]
})
export class NotificationsModule { }
