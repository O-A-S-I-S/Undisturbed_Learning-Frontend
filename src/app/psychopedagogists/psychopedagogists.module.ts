import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychopedagogistsRoutingModule } from './psychopedagogists-routing.module';
import { PsychopedagogistsComponent } from './psychopedagogists.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';


@NgModule({
  declarations: [
    PsychopedagogistsComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    PsychopedagogistsRoutingModule
  ],
  exports: [
    PsychopedagogistsComponent
  ]
})
export class PsychopedagogistsModule { }
