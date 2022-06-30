import { Appointment } from '../../../models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  studentId: any;
  appointments?: Appointment[];
  selectedAppointment?: Appointment;


  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private modalService: NgbModal,
              config: NgbModalConfig) { 
              this.studentId = this.route.snapshot.params['id'];
              config.backdrop = true;
              config.keyboard = true;
  }

  ngOnInit(): void {
    this.onDataTable(this.studentId);
  }

  openModal(content: any, ap:Appointment){
    this.selectedAppointment = ap;
    this.modalService.open(content);
  }

  onDataTable(studentId: number): void {
    const filter = {studentId: studentId};
    this.appointmentService.getCustom(filter).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => console.log(err),
    });
  }

  updateReminder(id: number): void {
    if (this.appointments == undefined) return;

    for (let appointment of this.appointments){
      if (appointment.id == id){
        if (appointment.date != undefined){
          var currentDate = new Date();
          var split = appointment.date.split('/');
          console.log(appointment.date);
          var appointmentDate = new Date(parseInt(split[2]), parseInt(split[0]) - 1, parseInt(split[1]));
          if (appointmentDate < currentDate){
            this.toastr.error('Solo se puede registrar recordatorio para citas pendientes', 'Error');
            return;
          }
        }

        const update = {
          reminderPsychopedagogist: !appointment.reminder,
        };
        this.appointmentService.updateAppointment(id, update).subscribe({
          next: (data) => {
            const confirmationId = {
              id: data.id,
            }
            appointment.reminder = !appointment.reminder;
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('No se pudo registrar el recordatorio', 'Actualización fallida');
          }
        })
      return;
      }
    }
  }
}
