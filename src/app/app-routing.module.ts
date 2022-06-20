import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [
  {path:'', redirectTo: 'sign-in', pathMatch: 'full',},
  {path:'sign-in', component:SignInComponent},
  {path:'log-in', component:LogInComponent},
  {path:'appointment-list', component:AppointmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
