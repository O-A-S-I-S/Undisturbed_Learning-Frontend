import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppointmentCreationComponent } from './components/appointment-creation/appointment-creation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportShowComponent } from './components/report-show/report-show.component';


@NgModule({
  declarations: [
    StudentsComponent,
    AppointmentListComponent,
    AppointmentCreationComponent,
    ReportShowComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
