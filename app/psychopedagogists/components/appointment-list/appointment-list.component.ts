import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment.model';
import { Student } from 'src/app/models/student.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { StudentService } from 'src/app/services/student.service';
import { Activity } from 'src/app/models/activity.model';
import { Cause } from 'src/app/models/cause.model';
import { ActivityService } from 'src/app/services/activity.service';
import { CauseService } from 'src/app/services/cause.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments?: Appointment[];
  activities?: Activity[];
  causes?: Cause[];
  student?: Student;
  filter: any;

  form: FormGroup;

  constructor(private appointmentService: AppointmentService,
              private studentService: StudentService,
              private activityService: ActivityService,
              private causeService: CauseService,
              private route: ActivatedRoute, 
              private fb: FormBuilder,
              private toastr: ToastrService) {
                this.filter = {};
                this.form = this.fb.group({
                  code: ['', Validators.required],
                  activity: ['', Validators.required],
                  cause: ['', Validators.required],
                  virtual: ['', Validators.required],
                  pending: ['', Validators.required],
                  startDate: ['', Validators.required],
                  endDate: ['', Validators.required],
                });
  }

  ngOnInit(): void {
    this.filter.psychopedagogistId =  this.route.snapshot.params['id'];

    this.activityService.getAll().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.causeService.getAll().subscribe({
      next: (data) => {
        this.causes = data;
      },
      error: (err) => console.log(err)
    });

    this.onDataTable();
  }

  onDataTable(): void {
    this.appointmentService.getCustom(this.filter).subscribe({
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

  cleanFilters(): void {
    this.form.reset(); 
    this.student = new Student()
    this.filter = {};
    this.filter.psychopedagogistId =  this.route.snapshot.params['id'];

    this.onDataTable();
  }

  appointmentsByCodeSearch(studentCode: string): void {
    this.studentService.getByCode(studentCode).subscribe({
      next: (data) => {
        this.student = data;
        
        this.filter['studentId'] = this.student.id;

        this.appointmentService.getCustom(this.filter).subscribe({
          next: (data) => {
            this.appointments = data;
            for (let appointment of this.appointments) appointment.student = this.student?.surname + " " + this.student?.lastName;
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('No se encontraron citas para el estudiante', 'Sin resultados');
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('El código ingresado no pertenece a ningún estudiante', 'Código inválido');
      }
    });
  }

  filterAppointments(): void {
    this.filter = {};
    this.filter.psychopedagogistId =  this.route.snapshot.params['id'];

    if (this.student != undefined) this.filter.studentId = this.student.id;
    if (this.form.get('activity')?.valid) this.filter.activity = this.form.get('activity')?.value;
    if (this.form.get('cause')?.valid) this.filter.cause = this.form.get('cause')?.value;
    if (this.form.get('virtual')?.valid) this.filter.virtual = this.form.get('virtual')?.value == 1;
    if (this.form.get('pending')?.valid) {
      if (this.form.get('pending')?.value == 0) this.filter.report = false;
      else this.filter.comment = false;
    }


    this.appointmentService.getCustom(this.filter).subscribe({
      next: (data) => {
        this.appointments = data;
        if (this.student != undefined) for (let appointment of this.appointments) appointment.student = this.student?.surname + " " + this.student?.lastName;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se encontraron citas para el estudiante', 'Sin resultados');
      }
    });
  }

}
