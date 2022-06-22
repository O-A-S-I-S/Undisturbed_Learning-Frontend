import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './components/menu/menu.component';
import { LogInPComponent } from './components/log-in-p/log-in-p.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LogInComponent,
    SignInComponent,
    MenuComponent,
    LogInPComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
