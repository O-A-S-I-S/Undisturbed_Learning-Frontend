import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PsychopedagogistService } from 'src/app/services/psychopedagogist.service';
import { LogInResponse } from '../../models/log-in-response.model';

@Component({
  selector: 'app-log-in-p',
  templateUrl: './log-in-p.component.html',
  styleUrls: ['./log-in-p.component.css']
})
export class LogInPComponent implements OnInit {
  psychopedagogist = new LogInResponse();
  loggedIn: boolean = false;
  validUsername: boolean = false;

  form: FormGroup;

  constructor(private psychopedagogistService: PsychopedagogistService, 
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
    this.psychopedagogistService.getByUsername(username).subscribe({
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
    this.psychopedagogistService.logIn(data).subscribe({
      next: (data) => {
        this.toastr.success('Las credenciales son correctas', 'Sesión comenzada');
        this.psychopedagogist = data;
        this.loggedIn = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('La contraseña es incorrecta', 'Error');
      },
    });
  }

  newLogIn(): void {
      this.psychopedagogist = new LogInResponse();
      this.form.reset();
      this.loggedIn = false;
      this.validUsername = false;
  }

}