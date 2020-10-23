import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from './pages.component';
import { AppointmentsComponent } from './appointments/appointments.component';

import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AppointmentsComponent,
    ProfileComponent
  ],
  exports:[
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class PagesModule { }
