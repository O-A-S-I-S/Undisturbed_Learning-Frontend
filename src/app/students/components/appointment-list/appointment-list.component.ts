import { Appointment } from '../../../models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  studentId: any;
  appointments?: Appointment[];


  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { 
              this.studentId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.onDataTable(this.studentId);
  }

  onDataTable(studentId: number): void {
    this.appointmentService.getCustom(studentId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => console.log(err),
    });
  }

}
