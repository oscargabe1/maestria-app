import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../guards/auth.guard";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailComponent } from "./appointments/appointment-detail/appointment-detail.component";
import { AppointmentAddComponent } from "./appointments/appointment-add/appointment-add.component";
import { AppointmentEditComponent } from "./appointments/appointment-edit/appointment-edit.component";
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ScheduleComponent } from './schedule/schedule.component';
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users/users.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";
import { PatientGuard } from '../guards/patient.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate:[AuthGuard],
        children:[
            {path: '', component: DashboardComponent, canActivate: [PatientGuard]},
            {path: 'profile', component: ProfileComponent, data:{title: 'Dashboard'}},
            {path: 'profile/edit', component: ProfileEditComponent, data:{title: 'Dashboard'}},
            {path: 'appointments', component: AppointmentsComponent, data:{title: 'Dashboard'}},
            {path: 'appointments/detail/:id', component: AppointmentDetailComponent, data:{title: 'Dashboard'}},
            {path: 'appointments/edit/:id', component: AppointmentEditComponent, data:{title: 'Dashboard'}},
            {path: 'appointments/add/:id', component: AppointmentAddComponent, data:{title: 'Dashboard'}},
            {path: 'schedule', component: ScheduleComponent, data:{title: 'Dashboard'}},
            {path: 'user/:id', component: UserComponent, data:{title: 'Dashboard'}},
            // {path: 'user/:id', component: UsersComponent, data:{title: 'Dashboard'}},
            // {path: 'user/edit/:id', component: UsersEditComponent, data:{title: 'Dashboard'}},
        ]
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}