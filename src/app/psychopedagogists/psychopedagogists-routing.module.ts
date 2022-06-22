import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';

const routes: Routes = [{ path: ':id', component: AppointmentListComponent },
                        { path: ':id/reports', component: ReportListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychopedagogistsRoutingModule { }
