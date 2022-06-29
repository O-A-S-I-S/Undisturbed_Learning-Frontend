import { PsychopedagogistService } from './../../../services/psychopedagogist.service';
import { Psychopedagogist } from './../../../models/psychopedagogist.model';
import { Student } from './../../../models/student.model';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private baseUrl:string = environment.baseUrl + '/Student';
  id: number;
  student?: Student;
  psychopedagogist: Psychopedagogist = new Psychopedagogist();
  appointments: Appointment[] = new Array<Appointment>();
  appointments_: Appointment[] = new Array<Appointment>();

  constructor(private route: ActivatedRoute, 
              private studentService: StudentService, 
              private appointmentService: AppointmentService,
              private psychopedagogistService: PsychopedagogistService) { 
    this.id = this.route.snapshot.params['id'];
    this.studentService.getById(this.id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => console.log(err),
    });
    this.appointmentService.getByStudentId(this.id).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log(this.appointments);
        if (this.appointments.length > 0)  {
          if(this.appointments.length > 2){
            for(let i = 0; i < 2; i++){
              this.appointments_.push(this.appointments[i]);
            }
          }
          else{
            this.appointments_ = this.appointments;           
          }
          for (let app of this.appointments_){
            this.psychopedagogistService.getById(app.psychopedagogistId).subscribe({
              next: (data) => {
                app.psychopedagogist = data.surname + " " + data.lastName;
              },
              error: (err) => console.log(err),
            });
          }
        }
      },
      error: (err) => console.log(err),
    });
  }

  getProffesionalName(ap: Appointment): string | undefined{
    
    this.psychopedagogistService.getById(ap.psychopedagogistId).subscribe({
      next: (data) => {
        this.psychopedagogist = data;
      },
      error: (err) => console.log(err),
    });
    return this.psychopedagogist.surname + " " +  this.psychopedagogist.lastName;
  }

  ngOnInit(): void {
  }

}
