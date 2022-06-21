import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  report: Report = new Report();

  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onDataTable(this.route.snapshot.params['appointmentId']);
  }

  onDataTable(appointmentId: number): void{
    this.reportService.getReportById(appointmentId).subscribe({
      next: (data) => {
        this.report = data;
        console.log(data);
      },
      error:(e)=>console.error(e),
    });
  }

}
