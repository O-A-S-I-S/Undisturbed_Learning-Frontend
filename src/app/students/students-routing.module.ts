import { HomeComponent } from './components/home/home.component';
import { ReportShowComponent } from './components/report-show/report-show.component';
import { AppointmentCreationComponent } from './components/appointment-creation/appointment-creation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [{ path: ':id', component: HomeComponent},
                        { path: ':id/appointments', component: AppointmentListComponent},
                        { path: ':id/appointments/register', component: AppointmentCreationComponent},
                        { path: ':id/appointments/:appointmentId/report', component: ReportShowComponent}
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
