import { LogInResponse } from './../../models/log-in-response.model';
import { Component, OnInit } from '@angular/core';
import { SignIn } from 'src/app/models/sign-in.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  credentials: SignIn = {
    Username: '',
    Password: '', 
    ConfirmPassword: '',
  };
  student: LogInResponse = new LogInResponse();
  validUsername: boolean = false;
  signedIn: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  getUsername(): void {
    // const Username = this.credentials.Username;
    this.studentService.getByUsername(this.credentials.Username).subscribe({
      next: (data) => {
        this.validUsername = true;
      },
      error: (err) => console.log(err),
    });
  }

  signIn(): void {
    const data = {
      Username: this.credentials.Username,
      Password: this.credentials.Password,
      ConfirmPassword: this.credentials.ConfirmPassword,
    };

    this.studentService.signIn(data).subscribe({
      next: (data) => {
        this.signedIn = true;
        this.student = data;
      },
      error: (err) => console.log(err),
    });
  }

  newSignIn(): void {
    this.credentials = {
      Username: '',
      Password: '', 
      ConfirmPassword: '',
    };
    this.student = new LogInResponse();
    this.validUsername = false;
    this.signedIn = false;
  }

}
