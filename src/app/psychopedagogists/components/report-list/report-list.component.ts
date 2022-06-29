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
  searchByName: boolean;
  ownReports: boolean;
  filter: any;

  form:  FormGroup;

  constructor(private reportService: ReportService,
              private studentService: StudentService,
              private route: ActivatedRoute, 
              private fb: FormBuilder,
              private toastr: ToastrService) {
                this.filter = {};
                this.searchByName = false;
                this.ownReports = false;
                this.psychopedagogistId = this.route.snapshot.params['id'];
                this.form = this.fb.group({
                  code: ['', Validators.required],
                  surname: ['', Validators.required],
                  lastName: ['', Validators.required],
                  startDate: ['', Validators.required],
                  endDate: ['', Validators.required],
                });
  }

  ngOnInit(): void {
  }

  cleanFilters(): void {
    this.form.reset(); 
    this.student = new Student()
    this.filter = {};
  }

  reportsByCodeSearch(studentCode: string): void {
    this.studentService.getByCode(studentCode).subscribe({
      next: (data) => {
        this.student = data;

        this.filter.studentId = this.student.id;

        this.reportService.getCustom(this.filter).subscribe({
          next: (data) => {
            this.searchByName = false;
            this.reports = data;
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

  filterReports(): void {
    this.filter = {};

    if (this.student != undefined) this.filter.studentId = this.student.id;
    if (this.form.get('startDate')?.valid){
      const startDate = this.form.get('startDate')?.value;   
      this.filter.startDate = startDate.slice(5, 7) + '/' + startDate.slice(8) + '/' + startDate.slice(0, 4);
    }
    if (this.form.get('endDate')?.valid){
      const endDate = this.form.get('endDate')?.value;   
      this.filter.endDate = endDate.slice(5, 7) + '/' + endDate.slice(8) + '/' + endDate.slice(0, 4);
    }
    if (this.ownReports) this.filter.psychopedagogistId =  this.route.snapshot.params['id'];

    this.reportService.getCustom(this.filter).subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se encontraron reportes', 'Sin resultados');
      }
    });
  }

  reportsByNameSearch(surname: string, lastName: string): void {
    this.cleanFilters();
    this.studentService.getByNameMatch(surname, lastName).subscribe({
      next: (data) => {
        this.students = data;

        this.reports = [];
        for (let student of this.students){
          this.filter.studentId = student.id;
          this.reportService.getCustom(this.filter).subscribe({
            next: (data) => {
              for (let report of data) report.studentCode = student.code; 
              if (this.reports == undefined) this.reports = data;
              else this.reports = this.reports.concat(data);
              this.searchByName = true;
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

    this.cleanFilters();
  }
}