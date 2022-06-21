import { AppointmentService } from './../../service/appointment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { ObjToArrayPipe } from './../../models/objToArray.pipe';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-lista-appointments',
  templateUrl: './lista-appointments.component.html',
  styleUrls: ['./lista-appointments.component.css']
})
export class ListaAppointmentsComponent implements OnInit {
  showMe:boolean=false;
  appointments?:Appointment[];
  form:FormGroup;
  form2:FormGroup;
  constructor(
    private appointmentService:AppointmentService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.form=this.fb.group({
        studentCode:['',Validators.required]
      })
     this.form2=this.fb.group({
      Rating:['',Validators.required],
      citaId:['',Validators.required]
     })
      
      
     }
  

      
    ngOnInit(): void {
      
    }

  retrieveAllAppointments():void{
    this.appointmentService.getAllAppointments().subscribe({
      next:(data)=>{
        this.appointments=data;
        
      },
      error: (e)=>console.log(e)
    })
  }
  retrieveAllAppointmentsByStudent():void{
    
      const c=this.form.get('studentCode')?.value;
      this.appointmentService.getAllAppointmentsByStudentId(c).subscribe({
        next:(data)=>{

          this.appointments=data;
          
          
          
        },
        error: (e)=>{console.log(e),
          this.toastr.error('No tiene citas asociadas','',{
            timeOut:2000,
          
          });
          this.form?.reset();
          this.appointments=[];
        }
        
      })
    }
    deleteAppointment(id?: number) {
      
      this.appointmentService.deleteAppointmentById(id).subscribe({
        next: (data) => {
          this.toastr.error(
            'La tarjeta fue eliminada con exito!',
            'Tarjeta eliminada'
          );
          this.retrieveAllAppointmentsByStudent();
        },
        
        error: (e) => {
          alert("error");
          console.log(e);
        },
      });
     
      
    }
    addRating(){
      const id=this.form2.get('citaId')?.value;
      const rate=this.form2.get('Rating')?.value;
      this.appointmentService.updateAppointmentRating(id,rate).subscribe({
        next:(data)=>{
          this.toastr.success('Calificacion actualizada');
          this.retrieveAllAppointmentsByStudent();
          this.onClick();
        },
        error: (e) => {
          alert("error");
          console.log(e);
        },
      })
    }
    onClick(id?:number){
      if(this.showMe==true)this.showMe=false;
      else this.showMe=true;
      this.form2.get('citaId')?.disable();
      // alert(this.form2.get('citaId')?.value)
      this.form2.get('citaId')?.setValue(id);
     
    }
      
    
  }

