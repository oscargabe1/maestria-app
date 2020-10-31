import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Appointment } from "../../../models/appointment.model";
import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  appointment:Appointment;
  loaded:boolean = false;

  public appointmentForm = this.fb.group({
    id: [{value:'', disabled:false}, []],
    user: [{value:'', disabled:true}, []],
    doctor: [{value:'', disabled:true}, []],
    start_date: [{value:'', disabled:true}, []],
    end_date: ['', []],
    status: [{value:'', disabled:true}, []],
    treatment: ['', []],
    notes: ['', []],
  });

  constructor(private activatedRoute:ActivatedRoute, public appointmentService:AppointmentService, private fb: FormBuilder, public router:Router) { }

  ngOnInit() {
    this.getAppointment();
  }

  getAppointment(){

    this.activatedRoute.params.subscribe(params =>{
      this.appointmentService.getAppointment(params.id)
        .subscribe(resp =>{  
          console.log(resp);
          console.log("RESP");
          this.appointment = resp.resultset;

          if (resp.statusCode === 0) {
            // let endDate = new Date(this.appointment.appointmentEndDate);
            // //let endDate = (new Date(this.appointment.appointmentEndDate)).toISOString();
            // //endDate.setHours(endDate.getHours()-6);
            // let endDateString = endDate.toISOString();
            // let endDateArr = endDateString.split('.');
            // endDateString = endDateArr[0];
            // console.log(endDate);
            if (resp.resultset.appointmentEndTimestamp != null) {
              let timestamp = parseInt(resp.resultset.appointmentEndTimestamp+'000');
              let endDate = new Date(timestamp).toISOString();
              let endDateArr = endDate.split('.');
              endDate = endDateArr[0];
              this.appointmentForm.controls['end_date'].setValue(endDate);    
            }

            this.appointmentForm.controls['id'].setValue(this.appointment.appointmentID);
            this.appointmentForm.controls['user'].setValue(this.appointment.appointmentUser);
            this.appointmentForm.controls['doctor'].setValue(this.appointment.appointmentDoctor);
            this.appointmentForm.controls['start_date'].setValue(this.appointment.appointmentStartDate);
            this.appointmentForm.controls['treatment'].setValue(this.appointment.appointmentTreatment);
            this.appointmentForm.controls['notes'].setValue(this.appointment.appointmentNotes);

            
            switch (this.appointment.appointmentStatus) {
              case 1:
                this.appointment.appointmentStatus = {
                  name:'Activa',
                  color:'badge bg-primary'
                };              
                this.appointmentForm.controls['status'].setValue('Activa');
                break;
              case 2:
                  this.appointment.appointmentStatus = {
                    name:'En Curso',
                    color:'badge bg-warning'
                  };
                  this.appointmentForm.controls['status'].setValue('En Curso');
                break;
              case 3:
                  this.appointment.appointmentStatus = {
                    name:'Terminada',
                    color:'badge bg-success'
                  };
                  this.appointmentForm.controls['status'].setValue('Terminada');
                break;
              case 3:
                  this.appointment.appointmentStatus = {
                    name:'Cancelada',
                    color:'badge bg-danger'
                  };
                  this.appointmentForm.controls['status'].setValue('Cancelada');
                break;
            
              default:
                this.appointment.appointmentStatus = {
                  name:'Activa',
                  color:'badge bg-primary'
                };
                break;
            }
          }

          console.log(this.appointment);
          this.loaded = true;
  
        })
    })

  }

  postAppointment(){
    console.log(this.appointmentForm.value);
    this.appointmentForm.getRawValue();
    this.appointmentService.editAppointment(this.appointmentForm.value)
    .subscribe(resp => {
      console.log(resp);
      console.log("POST");
      if(resp.statusCode == 0){
        //Navegar al Dashboard
        this.router.navigateByUrl('/dashboard/appointments');
        Swal.fire('OK', 'La información ha sido actualizada.', 'success');
      } else{
        console.warn(resp.statusMessage);
      }
    }, err =>{
      console.warn(err);
    })
  }

}
// "2020-10-30T15:44"
// 2020-10-30T21:37:00.000Z
