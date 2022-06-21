import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'student/:studentId', component:AppointmentsComponent},
  { path: 'student/:studentId/reports/:appointmentId', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

