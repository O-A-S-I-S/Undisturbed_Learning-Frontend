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
  appointments?:Appointment[];
  form:FormGroup;
  constructor(
    private appointmentService:AppointmentService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.form=this.fb.group({
        studentCode:['',Validators.required]
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
            timeOut:1000,
          
          });
          this.form?.reset();
          this.appointments=[];
        }
        
      })
    }
    deleteAppointment(id?: number) {
      const c=this.form.get('studentCode')?.value;
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
    
  }


