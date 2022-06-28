import { CreateworkshopComponent } from './components/createworkshop/createworkshop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';

const routes: Routes = [{ path: ':id', component: AppointmentListComponent },
                        { path: ':id/reports', component: ReportListComponent},
                        { path: ':id/workshops', component: WorkshopListComponent},
                        { path: ':id/workshops/create', component: CreateworkshopComponent}
                      
                      ]
                        
                        ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychopedagogistsRoutingModule { }
