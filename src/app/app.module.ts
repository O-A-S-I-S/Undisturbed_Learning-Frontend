import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportListComponent } from './psychopedagogists/components/report-list/report-list.component';
import { StudentsModule } from './students/students.module';
import { PsychopedagogistsModule } from './psychopedagogists/psychopedagogists.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    StudentsModule,
    PsychopedagogistsModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
