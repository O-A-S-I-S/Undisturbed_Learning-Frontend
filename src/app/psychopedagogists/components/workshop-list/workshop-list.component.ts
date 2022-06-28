import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Workshop } from 'src/app/models/workshop.model';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent implements OnInit {
  workshops?:Workshop[];
  form:FormGroup;

  psychopedagogistId: number;
  pageSize=5;
  desde:number=0;
  hasta:number=5;
  constructor(
    private workshopService:WorkshopService,
    private fb: FormBuilder,
    private toastr: ToastrService,private route:ActivatedRoute) {
      this.form=this.fb.group({
        psychopedagogistId:['',Validators.required]
      })
      this.psychopedagogistId = this.route.snapshot.params['id'];
      
      
     }

  ngOnInit(): void {
    this.retrieveAllWorkshopsByPsychopedagogistId()
  }
  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde=e.pageIndex*e.pageSize;
    this.hasta=this.desde+e.pageSize;
  }
  retrieveAllWorkshopsByPsychopedagogistId():void{
    
    // const c=this.form.get('psychopedagogistId')?.value;
    this.workshopService.getAllWorkshopsByPsychopedagogistId(this.psychopedagogistId).subscribe({
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
