import { PsychopedagogistService } from 'src/app/services/psychopedagogist.service';
import { Psychopedagogist } from './../../../models/psychopedagogist.model';
import { Times } from './../../../models/times';
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
  psychotimes?:Times[]
  psychopedagogists?:Psychopedagogist[]
  times=[
    {value:'8:00',label:'8:00-8:30'},
    {value:'8:30',label:'8:30-9:00'},
    {value:'9:00',label:'9:00-9:30'},
    {value:'9:30',label:'9:30-10:00'},
    {value:'10:00',label:'10:00-10:30'},
    {value:'10:30',label:'10:30-11:00'}
  ];
  timesUpdatable=[{value:'',label:''}]
  constructor(
    private appointmentService:AppointmentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,private psychopedagogistService:PsychopedagogistService) {
      this.id = this.route.snapshot.params['id'];

      this.form=this.fb.group({
        Fecha:['',Validators.required],
        Hora:['',Validators.required],
        Causa:['',Validators.required],
        psychopedagogistCode:['',Validators.required],
        causeDescription:['',Validators.required],
        activity:['',Validators.required],
        virtual:['',Validators.required],
        reminderStudent:['',Validators.required],
      })
     }

  ngOnInit(): void { 
    this.form.get('Causa')?.setValue("Estrés")
    this.form.get('Hora')?.setValue("8")
    // this.form.get('Actividad')?.setValue("Contención Psicológica")
    this.form.get('activity')?.setValue("Grupo de escucha")
    this.form.get('virtual')?.setValue("true")
    this.form.get('reminderStudent')?.setValue("true")
    this.psychopedagogistService.getAll().subscribe({
      next: (data) => {
        this.psychopedagogists = data;
      },
      error: (err) => console.log(err),
    });
  }
  print():void{
    // var fecha=this.form.get('Fecha')?.value
    // fecha=fecha.split('-')
    // fecha=fecha[2]+'-'+fecha[1]+'-'+fecha[0]
    // console.log(fecha);
  }
  updatePsychoTimes():void{
    this.timesUpdatable=[{value:'',label:''}]
    var addCriteria=true
    const psychoId=this.form.get('psychopedagogistCode')?.value
    var fecha=this.form.get('Fecha')?.value
    fecha=fecha.split('-')
    fecha=fecha[2]+'-'+fecha[1]+'-'+fecha[0]
    this.appointmentService.getTimesFromPsycho(psychoId,fecha).subscribe({
      next:(data)=>{
        this.psychotimes=data;
        this.timesUpdatable.pop()
        for(var a of this.times){
          addCriteria=true
          for(var e of this.psychotimes){
            if(a.value==e.startTime)addCriteria=false
          }
          if(addCriteria)this.timesUpdatable.push(a)
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
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
    var virtuality;
    var reminderstudent;
    if(this.form.get('virtual')?.value=="true")virtuality=true
    else virtuality=false
    if(this.form.get('reminderStudent')?.value=="true")reminderstudent=true
    else reminderstudent=false

    const appointment: AppointmentRequest={
      start:fechaformatoInicio,    
      end:fechaformatoFin,
      activity:this.form.get('activity')?.value,
      cause:this.form.get('Causa')?.value,
      causeDescription:this.form.get('causeDescription')?.value,
      virtual:virtuality,
      reminderStudent:reminderstudent,
      psychopedagogistId:this.form.get('psychopedagogistCode')?.value,
      studentId:this.id,
    }
    console.log(appointment)
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