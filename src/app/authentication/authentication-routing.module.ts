import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogInPComponent } from './components/log-in-p/log-in-p.component';

const routes: Routes = [{path: '', component: MenuComponent },
                        {path: 'psychopedagogist/login', component: LogInPComponent},
                        {path: 'student/login', component: LogInComponent},
                        {path: 'student/signin', component: SignInComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
