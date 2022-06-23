import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment.model';
import { Student } from 'src/app/models/student.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  psychopedagogistId: number;
  appointments?: Appointment[];
  student?: Student;

  form: FormGroup;

  constructor(private appointmentService: AppointmentService,
              private studentService: StudentService,
              private route: ActivatedRoute, 
              private fb: FormBuilder,
              private toastr: ToastrService) {
                this.psychopedagogistId = this.route.snapshot.params['id'];
                this.form = this.fb.group({
                  code: ['', Validators.required],
                });
  }

  ngOnInit(): void {
    this.onDataTable(this.psychopedagogistId);
  }

  onDataTable(psychopedagogistId: number): void {
    this.appointmentService.getByPsychopedagogistId(psychopedagogistId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => console.log(err),
    });
  }

  appointmentsByCodeSearch(studentCode: string): void {
    this.studentService.getByCode(studentCode).subscribe({
      next: (data) => {
        this.student = data;
        this.toastr.success('El código pertenece a un estudiante', 'Código válido');

        this.appointmentService.getByStudentId(this.student.id).subscribe({
          next: (data) => {
            this.appointments = data;
            this.toastr.success('Se muestran las citas encontradas', 'Búsqueda exitosa');
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

}
