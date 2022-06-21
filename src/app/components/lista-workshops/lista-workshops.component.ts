import { WorkshopService } from './../../service/workshop.service';
import { Workshop } from './../../models/workshop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-workshops',
  templateUrl: './lista-workshops.component.html',
  styleUrls: ['./lista-workshops.component.css']
})
export class ListaWorkshopsComponent implements OnInit {

  workshops?:Workshop[];
  form:FormGroup;
  constructor(
    private workshopService:WorkshopService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.form=this.fb.group({
        psychopedagogistId:['',Validators.required]
      })
     
      
      
     }

  ngOnInit(): void {
  }
  retrieveAllWorkshopsByPsychopedagogistId():void{
    
    const c=this.form.get('psychopedagogistId')?.value;
    this.workshopService.getAllWorkshopsByPsychopedagogistId(c).subscribe({
      next:(data)=>{

        this.workshops=data;
        
        
        
      },
      error: (e)=>{console.log(e),
        this.toastr.error('No tiene citas asociadas','',{
          timeOut:2000,
        
        });
        this.form?.reset();
        this.workshops=[];
      }
      
    })
  }
  deleteWorkshop(id?: number) {
    
    this.workshopService.deleteWokshopById(id).subscribe({
      next: (data) => {
        this.toastr.error(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta eliminada'
        );
        this.retrieveAllWorkshopsByPsychopedagogistId();
      },
      
      error: (e) => {
        alert("error");
        console.log(e);
      },
    });
   
    
  }
}
