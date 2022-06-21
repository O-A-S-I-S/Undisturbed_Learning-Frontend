import { ListaWorkshopsComponent } from './components/lista-workshops/lista-workshops.component';
import { CreateappointmentComponent } from './components/createappointment/createappointment.component';
import { StudentsComponent } from './components/students/students.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAppointmentsComponent } from './components/lista-appointments/lista-appointments.component';

const routes: Routes = [
  {path:'appointments',component:ListaAppointmentsComponent},
  {path:'student',component:StudentsComponent},
  {path:'add',component:CreateappointmentComponent},
  {path:'workshops',component:ListaWorkshopsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
