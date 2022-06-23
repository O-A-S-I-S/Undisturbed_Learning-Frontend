import { AppointmentRequest } from './../../models/appointment-request.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.css']
})
export class AppointmentCreationComponent implements OnInit {
  id: number;
  form:FormGroup;

  constructor(
    private appointmentService:AppointmentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.id = this.route.snapshot.params['id'];

      this.form=this.fb.group({
        Fecha:['',Validators.required],
        Hora:['',Validators.required],
        Causa:['',Validators.required],
        Recordatorio:['',Validators.required],
        psychopedagogistCode:['',Validators.required],
        studentCode:['',Validators.required],
      })
     }

  ngOnInit(): void { }

  createAppointment():void{
    const fecha=this.form.get('Fecha')?.value;
    const hora=this.form.get('Hora')?.value;
    
    var fechaformatoInicio;
    var fechaformatoFin;
    if(hora<10){
       fechaformatoInicio=fecha+'T'+'0'+hora+':00:00';
       fechaformatoFin=fecha+'T'+'0'+hora+':45:00';
    }
    else{
       fechaformatoInicio=fecha+'T'+hora+':00:00';
       fechaformatoFin=fecha+'T'+hora+':45:00';
    }

    const appointment: AppointmentRequest={
      start:fechaformatoInicio,
      end:fechaformatoFin,
      cause:this.form.get('cause')?.value,
      causeDescription:this.form.get('causeDescription')?.value,
      psychopedagogistId:this.form.get('psychopedagogistId')?.value,
      studentId:this.form.get('studentId')?.value,
    }

    this.appointmentService.createAppointment(appointment).subscribe({
      next:(data)=>{
        this.form.reset();
        this.toastr.success('Cita creada exitosamente', 'Registro exitoso');
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('Completa los datos correctamente', 'Registro fallido');
      }
    })
  }
}