import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.model";
import { Specialty } from "../../../models/specialty.model";
import { SpecialtyService } from "../../../services/specialty.service";
import { ScheduleService } from "../../../services/schedule.service";
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user:User;
  specialties:Specialty;
  nTreatment:string = '';
  schedule;
  //userForm:FormGroup;

  public userForm = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required]],
    school: ['', []],
    phone: ['', []],
    specialty: ['', []],
    location: ['', []],
    treatments: ['', []],
    notes: ['', []],
  });

  constructor(public userService:UserService, public specialtyService:SpecialtyService, public scheduleService:ScheduleService, private fb: FormBuilder, public router:Router) { }

  ngOnInit() {
    //this.initForm();
    this.getUser();
    this.getSpecialties();
  }
  getUser(){
    this.userService.getUser()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset;

        if (resp.statusCode === 0) {
          this.userForm.controls['id'].setValue(this.user.userID);
          this.userForm.controls['name'].setValue(this.user.userName);
          this.userForm.controls['school'].setValue(this.user.userSchool);
          this.userForm.controls['phone'].setValue(this.user.userPhone);
          this.userForm.controls['specialty'].setValue(this.user.userSpecialty.pk_specialty);
          this.userForm.controls['location'].setValue(this.user.userLocation);
          this.userForm.controls['notes'].setValue(this.user.userNotes);
        }
      })
  }
  getSpecialties(){
    this.specialtyService.getSpecialties()
      .subscribe(resp =>{
        console.log(resp);
        this.specialties = resp.resultset;
      })
  }
  deleteTreatment(id){
    console.log("delete",id);
    let treatments = this.user.userTreatments;

    treatments.forEach( treatment => {
      if (treatment.pk_treatment == id) {
        const index = treatments.indexOf(treatment);
        if (index > -1) {
          treatments.splice(index, 1);
        }
      } 
    });
  }

  addTreatment(){
    console.log("add");
    let treatments = this.user.userTreatments;
    let nTreatmentID = 0;
    let treatmentIDS = [];

    if(this.nTreatment.length > 1){
      treatments.forEach( treatment => {
        treatmentIDS.push(treatment.pk_treatment);
      });
  
      nTreatmentID = Math.max(...treatmentIDS);
  
      treatments.push({
        pk_treatment: nTreatmentID+1,
        treatment_name: this.nTreatment
      });
      this.nTreatment = '';
      console.log(this.user.userTreatments);
    }

  }

  initForm(){
    this.userForm = this.fb.group({
      name: [this.user.userName, [Validators.required]],
      school: [this.user.userSchool, []],
      phone: [this.user.userPhone, []],
      specialty: [this.user.userSpecialty, []],
      location: [this.user.userLocation, []],
      treatments: [this.user.userTreatments, []],
      notes: [this.user.userNotes, []],
    });
  }
  getSchedule(doctorID:number){
    this.scheduleService.getScheduleDetail(doctorID)
      .subscribe(resp =>{
        console.log(resp);
        console.log("SCHEDULE");
        this.schedule = resp.resultset; 
      })
  }

  postUser(){
    this.userForm.controls['treatments'].setValue(this.user.userTreatments);
    this.userService.postUser(this.userForm.value)
      .subscribe(resp => {
        console.log(resp);
        if(resp.statusCode == 0){
          //Navegar al Dashboard
          this.router.navigateByUrl('/dashboard');
          Swal.fire('OK', 'Tu información ha sido actualizada.', 'success');
        } else{
          console.warn(resp.statusMessage);
        }
      }, err =>{
        console.warn(err);
      })
  }

}
