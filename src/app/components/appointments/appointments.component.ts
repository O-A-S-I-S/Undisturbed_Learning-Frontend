import { AppComponent } from './../../app.component';
import { AppointmentsService } from './../../services/appointments.service';
import { Appointment } from './../../models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments?: Appointment[];
  appointment: Appointment = new Appointment();
  appComp: AppComponent = new AppComponent();
  constructor(
    private appointmentService: AppointmentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.onDataTable(this.appComp.studentId);
    //this.onDataTable(4);
  }

  onDataTable(studentId: number): void{
    this.appointmentService.getStudentAppointments(studentId).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log("a");
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  myAlert(ap:Appointment): void{
    console.log(ap.comment);
    alert(ap.comment);
    //this.toastr.info(ap.comment);
  }

}
