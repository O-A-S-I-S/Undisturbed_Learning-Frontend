import { ReportService } from './../../../services/report.service';
import { Appointment } from '../../../models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  studentId: any;
  appointments?: Appointment[];
  appointmentSelected?: Appointment;
  report?: Report;

  constructor(private reportService:ReportService,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              config: NgbModalConfig, 
              private modalService: NgbModal) { 
              this.studentId = this.route.snapshot.params['id'];
              config.backdrop = true;
              config.keyboard = true;
  }

  ngOnInit(): void {
    this.onDataTable(this.studentId);
  }

  open_modal(content:any, ap:Appointment) {
    
    this.appointmentSelected = ap;
    this.modalService.open(content); 
    
  }

  onDataTable(studentId: number): void {
    this.appointmentService.getByStudentId(studentId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => console.log(err),
    });
  }

  popActivated(appointmentId:number){
    this.reportService.getByAppointmentId(appointmentId).subscribe({
      next: (data) => {
        this.report = data;
        console.log(data);
      },
      error:(e)=>console.error(e),
    });
  }

}

