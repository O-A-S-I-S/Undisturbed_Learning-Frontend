import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { LogInResponse } from '../../models/log-in-response.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  student = new LogInResponse();
  loggedIn: boolean = false;
  validUsername: boolean = false;

  form: FormGroup;

  constructor(private studentService: StudentService, 
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  getUsername(username: string): void {
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

  logIn(): void {
    const data = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };
    this.studentService.logIn(data).subscribe({
      next: (data) => {
        this.toastr.success('Las credenciales son correctas', 'Sesión comenzada');
        this.student = data;
        this.loggedIn = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('La contraseña es incorrecta', 'Error');
      },
    });
  }

  newLogIn(): void {
      this.student = new LogInResponse();
      this.form.reset();
      this.loggedIn = false;
      this.validUsername = false;
  }

}
