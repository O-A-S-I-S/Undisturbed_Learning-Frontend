import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  psychopedagogistId: number;
  appointments?: Appointment[];

  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute, 
              private toastr: ToastrService) {
                this.psychopedagogistId = this.route.snapshot.params['id'];
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

}
