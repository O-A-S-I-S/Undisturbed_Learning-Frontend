import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'authentication', pathMatch: 'full',},
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  { path: 'psychopedagogists', loadChildren: () => import('./psychopedagogists/psychopedagogists.module').then(m => m.PsychopedagogistsModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
