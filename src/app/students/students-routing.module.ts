import { AppointmentCreationComponent } from './components/appointment-creation/appointment-creation.component';
import { AuthenticationComponent } from './../authentication/authentication.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [{ path: ':id', component: AppointmentListComponent},
                        { path: ':id/register', component: AppointmentCreationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
