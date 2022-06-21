import { LogInResponse } from './../../models/log-in-response.model';
import { Component, OnInit } from '@angular/core';
import { SignIn } from 'src/app/models/sign-in.model';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  student: LogInResponse = new LogInResponse();
  validUsername: boolean = false;
  signedIn: boolean = false;

  form: FormGroup;

  constructor(private studentService: StudentService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termsAccepted: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  getUsername(username: string): void {
    // const Username = this.credentials.Username;
    this.studentService.getByUsername(username).subscribe({
      next: (data) => {
          this.toastr.success('El usuario es correcto', 'Usuario validado');
          this.validUsername = true;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('El usuario es incorrecto', 'Error');
        },
    });
  }

  signIn(): void {
    const data = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      ConfirmPassword: this.form.get('confirmPassword')?.value,
    };

    if (data.password != data.ConfirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Registro fallido');
      return;
    }

    let validator = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!data.password.match(validator)){
      this.toastr.error('La contraseña no es lo suficientemente segura', 'Registro fallido');
      return;      
    }

    this.studentService.signIn(data).subscribe({
      next: (data) => {
        this.toastr.success('¡Éxito! Las contraseñas coinciden y son seguras', 'Registro exitoso');
        this.signedIn = true;
        this.student = data;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Contraseña no cumple con los requisitos', 'Registro fallido');
      },
    });
  }

  newSignIn(): void {
    this.form.reset();
    this.student = new LogInResponse();
    this.validUsername = false;
    this.signedIn = false;
  }

}
