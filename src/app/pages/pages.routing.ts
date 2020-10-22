import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../guards/auth.guard";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate:[AuthGuard],
        children:[
            {path: '', component: DashboardComponent, data:{title: 'Dashboard'}},
            {path: 'appointments', component: AppointmentsComponent, data:{title: 'Dashboard'}},
        ]
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}