import { Appointment } from 'src/app/models/appointment';
import { Createappointment } from './../../models/createappointment';
import { AppointmentService } from './../../service/appointment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createappointment',
  templateUrl: './createappointment.component.html',
  styleUrls: ['./createappointment.component.css']
})
export class CreateappointmentComponent implements OnInit {
  form:FormGroup;
  // appointment?:Createappointment;
  constructor(
    private appointmentService:AppointmentService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.form=this.fb.group({
        Fecha:['',Validators.required],
        Hora:['',Validators.required],
        Causa:['',Validators.required],
        Recordatorio:['',Validators.required],
        psychopedagogistCode:['',Validators.required],
        studentCode:['',Validators.required],
        
        
      })
     
      
      
     }

  ngOnInit(): void {
    
  }
  createAppointment():void{
    
    const fecha=this.form.get('Fecha')?.value;
    const hora=this.form.get('Hora')?.value;
    alert(hora);
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
   

    

    const appointment:Createappointment={
      day:this.form.get('Fecha')?.value,
      start:fechaformatoInicio,
      end:fechaformatoFin,
      causeDescription:this.form.get('Causa')?.value,
      // reminder:this.form.get('Recordatorio')?.value,
      psychopedagogist:this.form.get('psychopedagogistCode')?.value,
      student:this.form.get('studentCode')?.value,


    }
    this.appointmentService.addAppointment(appointment).subscribe({
      next:(data)=>{
        this.form.reset();
        
      },
      error:(e)=>{
        this.toastr.error('Error');
      }
    })
    
    console.log(appointment);
  }
}
