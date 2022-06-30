import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { Psychopedagogist } from 'src/app/models/psychopedagogist.model';
import { Student } from 'src/app/models/student.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PsychopedagogistService } from 'src/app/services/psychopedagogist.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: number;
  student?: Student;
  psychopedagogist?: Psychopedagogist;
  appointments?: Appointment[];
  appointments_: Appointment[];

  constructor(private route: ActivatedRoute, 
              private studentService: StudentService, 
              private appointmentService: AppointmentService,
              private psychopedagogistService: PsychopedagogistService) { 
    this.id = this.route.snapshot.params['id'];
    this.appointments_ = new Array<Appointment>()

    this.studentService.getById(this.id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => console.log(err),
    });

    const filter = { studentId: this.id};
    this.appointmentService.getCustom(filter).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log(this.appointments);
        if (this.appointments != undefined && this.appointments.length > 0)  {
          if(this.appointments.length > 2){
            for(let i = 0; i < 2; i++){
              this.appointments_.push(this.appointments[i]);
            }
          }
          else{
            this.appointments_ = this.appointments;           
          }
        }
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void { }

}

