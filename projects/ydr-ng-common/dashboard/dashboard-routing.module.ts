import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserResolver } from 'ydr-ng-common/user';
import { AuthGuard } from 'ydr-ng-common/auth';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  pathMatch: 'full',
  canLoad: [
    AuthGuard
  ],
  resolve: [
    UserResolver
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
