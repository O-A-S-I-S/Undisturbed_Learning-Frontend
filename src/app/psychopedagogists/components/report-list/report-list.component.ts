import { ReportService } from './../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  psychopedagogistId: number;
  reports?: Report[];
  student?: Student;
  students?: Student[];
  filtered: boolean = false;

  form:  FormGroup;

  constructor(private reportService: ReportService,
              private studentService: StudentService,
              private route: ActivatedRoute, 
              private fb: FormBuilder,
              private toastr: ToastrService) {
                this.psychopedagogistId = this.route.snapshot.params['id'];
                this.form = this.fb.group({
                  code: ['', Validators.required],
                  surname: ['', Validators.required],
                  lastName: ['', Validators.required],
                });
  }

  ngOnInit(): void {
    this.onDataTable(this.psychopedagogistId);
  }

  onDataTable(psychopedagogistId: number): void {
    this.reportService.getByPsychopedagogistId(psychopedagogistId).subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => console.log(err),
    });
    this.filtered = false;
  }

  reportsByCodeSearch(studentCode: string): void {
    this.studentService.getByCode(studentCode).subscribe({
      next: (data) => {
        this.student = data;
        this.toastr.success('El código pertenece a un estudiante', 'Código válido');

        this.reportService.getByStudentId(this.student.id).subscribe({
          next: (data) => {
            this.reports = data;
            this.filtered = true;
            this.toastr.success('Se muestran los reportes encontrados', 'Búsqueda exitosa');
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('No se encontraron reportes para el estudiante', 'Sin resultados');
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('El código ingresado no pertenece a ningún estudiante', 'Código inválido');
      }
    });
  }

  reportsByNameSearch(surname: string, lastName: string): void {
    this.studentService.getByNameMatch(surname, lastName).subscribe({
      next: (data) => {
        this.students = data;
        console.log(data);
        this.toastr.success('Existe al menos un estudiante con ese nombre', 'Nombre válido');

        this.reports = [];
        for (let student of this.students){
          this.reportService.getByStudentId(student.id).subscribe({
            next: (data) => {
              if (this.reports == undefined) this.reports = data;
              else this.reports = this.reports.concat(data);
              this.filtered = true;
              this.toastr.success('Se muestran los reportes encontrados', 'Búsqueda exitosa');
            },
            error: (err) => {
              console.log(err);
              this.toastr.error('No se encontraron reportes', 'Sin resultados');
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('El nombre ingresado no pertenece a ningún estudiante', 'Nombre incorrecto');
      }
    });
  }
}