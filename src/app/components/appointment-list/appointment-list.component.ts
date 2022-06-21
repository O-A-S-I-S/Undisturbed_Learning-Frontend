import { Appointment } from './../../models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  studentId?: string;
  appointments?: Appointment[];

  form?: FormGroup;

  constructor(private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        description:['',Validators.required],
      });
    }

  ngOnInit(): void {
    this.studentId = '1';
    this.onDataTable(this.studentId);
  }

  onDataTable(studentId: string): void {
    this.appointmentService.getByStudentId(studentId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => console.log(err),
    });
  }

}
