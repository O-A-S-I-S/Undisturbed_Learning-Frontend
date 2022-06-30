import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkshopService } from 'src/app/services/workshop.service';
import { WorkshopRequest } from '../../models/workshop-request.model';

@Component({
  selector: 'app-workshop-creation',
  templateUrl: './workshop-creation.component.html',
  styleUrls: ['./workshop-creation.component.css']
})
export class WorkshopCreationComponent implements OnInit {
  psychopedagogistId: number;
  form:FormGroup;
  constructor(
    private workshopService:WorkshopService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route:ActivatedRoute) {
      this.form=this.fb.group({
        Fecha:['',Validators.required],
        HoraInicio:['',Validators.required],
        HoraFin:['',Validators.required],
        Titulo:['',Validators.required],
        Brief:['',Validators.required],
        Text:['',Validators.required],
        Comment:['',Validators.required],
        psychopedagogistCode:['',Validators.required],
        reminder:['',Validators.required],
        
        
      })
      this.psychopedagogistId = this.route.snapshot.params['id'];
      
      
     }

  ngOnInit(): void {
   this.form.get('reminder')?.setValue("true")
   this.form.get('HoraInicio')?.setValue(8)
  //  this.form.get('HoraFin')?.setValue(9)
  }
  createWorkshop():void{
    
    const fecha=this.form.get('Fecha')?.value;
    const horaInicio=this.form.get('HoraInicio')?.value;
    const horaFin=this.form.get('HoraFin')?.value;
    
    var fechaformatoInicio;
    var fechaformatoFin;
    if(horaInicio<10){
       fechaformatoInicio=fecha+'T'+'0'+horaInicio+':00:00';
       fechaformatoFin=fecha+'T'+'0'+horaFin+':00:00';
    }
    else{
       fechaformatoInicio=fecha+'T'+horaInicio+':00:00';
       fechaformatoFin=fecha+'T'+horaFin+':00:00';
    }
   var reminder;
   if(this.form.get('reminder')?.value=="true")reminder=true
   else reminder=false

    

    const workshop:WorkshopRequest={
      day:this.form.get('Fecha')?.value,
      start:fechaformatoInicio,
      end:fechaformatoFin,
      title:this.form.get('Titulo')?.value,
      brief:this.form.get('Brief')?.value,
      text:this.form.get('Text')?.value,
      reminder:reminder,
      psychopedagogistId:this.psychopedagogistId,
      


    }
    this.workshopService.addWorkshop(workshop).subscribe({
      next:(data)=>{
        this.form.reset();
        this.toastr.success('Taller creado exitosamente')
      },
      error:(e)=>{
        this.toastr.error('Completa los datos correctamente');
      }
    })
    
    
  }
  onChange(){
      
      if(this.form.get('HoraInicio')?.valueChanges){
        if(this.form.get('HoraInicio')?.value<8)this.form.get('HoraInicio')?.setValue(8) 
        else if(this.form.get('HoraInicio')?.value>18)this.form.get('HoraInicio')?.setValue(18) 
        else if (this.form.get('HoraFin')?.value-this.form.get('HoraInicio')?.value==0){this.form.get('HoraFin')?.setValue(this.form.get('HoraInicio')?.value+1)}
      }
      
      
  }
  checkValue(){
    if(this.form.get('HoraFin')?.value<8)this.form.get('HoraFin')?.setValue(this.form.get('HoraInicio')?.value+1) 
        else if(this.form.get('HoraFin')?.value>18)this.form.get('HoraFin')?.setValue(18) 
    if(this.form.get('HoraFin')?.value<=this.form.get('HoraInicio')?.value){
      this.form.get('HoraFin')?.setValue(this.form.get('HoraInicio')?.value+1)
    }
  }
}

