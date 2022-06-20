import { Component, OnInit } from '@angular/core';
import { LogInResponse } from 'src/app/models/log-in-response.model';
import { LogIn } from 'src/app/models/log-in.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  credentials: LogIn = {
    Username: '',
    Password: '',
  };
  student = new LogInResponse();
  loggedIn: boolean = false;
  validUsername: boolean = false;

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

  logIn(): void {
    const data = {
      Username: this.credentials.Username,
      Password: this.credentials.Password,
    };
    this.studentService.logIn(data).subscribe({
      next: (data) => {
        this.student = data;
        this.loggedIn = true;
      },
      error: (error) => console.error(error),
    });
  }

  newLogIn(): void {
      this.student = new LogInResponse();
      this.credentials = {
        Username: '',
        Password: '',
      };
      this.loggedIn = false;
      this.validUsername = false;
  }

}
