import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychopedagogistsRoutingModule } from './psychopedagogists-routing.module';
import { PsychopedagogistsComponent } from './psychopedagogists.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WorkshopCreationComponent } from './components/workshop-creation/workshop-creation.component';


@NgModule({
  declarations: [
    PsychopedagogistsComponent,
    AppointmentListComponent,
    ReportListComponent,
    WorkshopListComponent,
    WorkshopCreationComponent
  ],
  imports: [
    CommonModule,
    PsychopedagogistsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    MatPaginatorModule,
  ],
  exports: [
    PsychopedagogistsComponent
  ]
})
export class PsychopedagogistsModule { }
