import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from './pages.component';
import { AppointmentsComponent } from './appointments/appointments.component';

import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail.component';
import { AppointmentEditComponent } from './appointments/appointment-edit/appointment-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AppointmentsComponent,
    ProfileComponent,
    UsersComponent,
    UsersEditComponent,
    ProfileEditComponent,
    AppointmentDetailComponent,
    AppointmentEditComponent
  ],
  exports:[
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
