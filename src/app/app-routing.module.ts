import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'sign-in', pathMatch: 'full',},
  {path:'sign-in', component:SignInComponent},
  {path:'log-in', component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
