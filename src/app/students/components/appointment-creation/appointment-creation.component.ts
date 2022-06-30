import { ActivityService } from 'src/app/services/activity.service';
import { CauseService } from 'src/app/services/cause.service';
import { Activity } from 'src/app/models/activity.model';
import { Cause } from 'src/app/models/cause.model';
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
  causes?:Cause[]
  activities?:Activity[]
  psychopedagogists?:Psychopedagogist[]
  times=[
    {value:'08:00',label:'08:00-08:30'},
    {value:'08:30',label:'08:30-09:00'},
    {value:'09:00',label:'09:00-09:30'},
    {value:'09:30',label:'09:30-10:00'},
    {value:'10:00',label:'10:00-10:30'},
    {value:'10:30',label:'10:30-11:00'},
    {value:'11:00',label:'11:00-11:30'},
    {value:'11:30',label:'11:30-12:00'},
    {value:'12:00',label:'12:00-12:30'},
    {value:'12:30',label:'12:30-13:00'},
    {value:'13:00',label:'13:00-13:30'},
    {value:'13:30',label:'13:30-14:00'},
    {value:'14:00',label:'14:00-14:30'},
    {value:'14:30',label:'14:30-15:00'},
    {value:'15:00',label:'15:00-17:30'},
    {value:'15:30',label:'15:30-16:00'},
    {value:'16:00',label:'16:00-16:30'},
    {value:'16:30',label:'16:30-17:00'},
    {value:'17:00',label:'17:00-17:30'},
    {value:'17:30',label:'17:30-18:00'},
  ];
  timesUpdatable=[{value:'',label:''}]
  constructor(
    private appointmentService:AppointmentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,private psychopedagogistService:PsychopedagogistService,
    private causeService:CauseService,private activityService:ActivityService) {
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
    this.causeService.getAll().subscribe({
      next: (data) => {
        this.causes = data;
      },
      error: (err) => console.log(err),
    });
    this.activityService.getAll().subscribe({
      next: (data) => {
        this.activities = data;
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
    var hora=this.form.get('Hora')?.value;
    var fechaformatoInicio;
    var fechaformatoFin;
    hora=hora.split(':')
    var hour=hora[0]
    var min=hora[1]
    if(min=='00'){
      fechaformatoInicio=fecha+'T'+hour+':'+min+':00';
      fechaformatoFin=fecha+'T'+hour+':30:00';
    }
    else{
      fechaformatoInicio=fecha+'T'+hour+':'+min+':00';
      hour=Number(hour)
      hour=hour+1
      if(hour<10){
        fechaformatoFin=fecha+'T'+'0'+hour+':00:00';
      }
      else{
        fechaformatoFin=fecha+'T'+hour+':00:00';
      }
    }
    console.log(fechaformatoInicio)
    console.log(fechaformatoFin)
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