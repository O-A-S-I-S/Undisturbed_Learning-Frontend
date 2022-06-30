import { Appointment } from '../../../models/appointment.model';
import { ReportService } from '../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Psychopedagogist } from 'src/app/models/psychopedagogist.model';
import { PsychopedagogistService } from 'src/app/services/psychopedagogist.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {

  report?: Report;
  appointmentId?: number;
  psychopedagogistId: number;
  apppointment_selected: Appointment = new Appointment();
  appointments?: Appointment[];
  psychopedagogist: Psychopedagogist = new Psychopedagogist();
  
  constructor(private reportService: ReportService,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private psychopedagogistService: PsychopedagogistService) {
      this.psychopedagogistId = this.route.snapshot.params['id'];
      this.appointmentId = this.route.snapshot.params['appointmentId'];      
      const filter = {psychopedagogistId: this.psychopedagogistId};
      this.appointmentService.getCustom(filter).subscribe({
        next: (data) => {
          this.appointments = data;          
          if (this.appointments != undefined){
            for(let app of this.appointments){
              if(this.appointmentId == app.id){
                this.apppointment_selected = app;
              }
            }
            if(this.apppointment_selected != undefined){
              this.psychopedagogistService.getById(this.apppointment_selected.psychopedagogistId).subscribe({
                next: (data) => {
                  this.apppointment_selected.psychopedagogist = data.surname + " " + data.lastName;
                },
                error: (err) => console.log(err),
              });
            }
          }
        },
        error: (err) => console.log(err),
      });

  }

  ngOnInit(): void {
    this.getAppointmentReport();
  }

  getAppointmentReport(): void{
    if (this.appointmentId != undefined){
      this.reportService.getByAppointmentId(this.appointmentId).subscribe({
        next: (data) => {
          this.report = data;
          console.log(data);
        },
        error:(e)=>console.error(e),
      });
    }
  }

}
