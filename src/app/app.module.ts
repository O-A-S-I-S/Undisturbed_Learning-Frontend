import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { StudentsComponent } from './components/students/students.component';
import { ListaAppointmentsComponent } from './components/lista-appointments/lista-appointments.component';
import { ObjToArrayPipe } from './models/objToArray.pipe';
import{GetFromArray}from './models/getFromArray.pipe';
import { CreateappointmentComponent } from './components/createappointment/createappointment.component';

import { WorkshopsComponent } from './component/workshops/workshops.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ListaAppointmentsComponent,
    ObjToArrayPipe,
    GetFromArray,
    CreateappointmentComponent,
    WorkshopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
