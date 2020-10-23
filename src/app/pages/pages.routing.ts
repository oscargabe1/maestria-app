import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../guards/auth.guard";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from './appointments/appointments.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { UsersComponent } from "./users/users.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate:[AuthGuard],
        children:[
            {path: '', component: DashboardComponent, data:{title: 'Dashboard'}},
            {path: 'appointments', component: AppointmentsComponent, data:{title: 'Dashboard'}},
            {path: 'profile', component: ProfileComponent, data:{title: 'Dashboard'}},
            {path: 'profile/edit', component: ProfileEditComponent, data:{title: 'Dashboard'}},
            {path: 'user/:id', component: UsersComponent, data:{title: 'Dashboard'}},
            {path: 'user/edit/:id', component: UsersEditComponent, data:{title: 'Dashboard'}},
        ]
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}