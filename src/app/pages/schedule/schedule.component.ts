import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { ScheduleService } from "../../services/schedule.service";
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  user:User;
  schedule;
  disabledDays = [
    false,false,false,false,false,false,false,false
  ]
  public scheduleForm = this.fb.group({
    id: ['', []],
    d1_start: ['', []],
    d1_end: ['', []],
    d2_start: ['', []],
    d2_end: ['', []],
    d3_start: ['', []],
    d3_end: ['', []],
    d4_start: ['', []],
    d4_end: ['', []],
    d5_start: ['', []],
    d5_end: ['', []],
    d6_start: ['', []],
    d6_end: ['', []],
    d7_start: ['', []],
    d7_end: ['', []],
  });

  constructor(public userService:UserService, public scheduleService:ScheduleService, private fb: FormBuilder, public router:Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset;

        if (resp.statusCode === 0) {

          this.getSchedule(this.user.userID);
          this.scheduleForm.controls['id'].setValue(this.user.userID);

        }
      })
  }

  getSchedule(doctorID:number){
    this.scheduleService.getScheduleDetail(doctorID)
      .subscribe(resp =>{
        console.log(resp);
        console.log("SCHEDULE");
        this.schedule = resp.resultset; 
        this.schedule.forEach(sc => {
          for (let index = 1; index < 8; index++) {
            if (sc.dayNumber == index) {
              this.scheduleForm.controls[`d${index}_start`].setValue(sc.start);
              this.scheduleForm.controls[`d${index}_end`].setValue(sc.end);

              if (sc.start == null) {
                this.disabledDays[index] = true;
              }
            }
          }
        });
      })
  }
  disableDay(dayNumber:number){
    this.disabledDays[dayNumber] = !this.disabledDays[dayNumber];
  }
  postSchedule(){
    this.disabledDays.forEach((values,keys)=>{ 
      for (let index = 1; index < 8; index++) {
        if (keys == index && values == true) {
          this.scheduleForm.controls[`d${index}_start`].setValue(null);
          this.scheduleForm.controls[`d${index}_end`].setValue(null);
        }
      }
    })

    console.log(this.scheduleForm.value);

    this.scheduleService.postSchedule(this.scheduleForm.value)
      .subscribe(resp => {
        console.log(resp);
        if(resp.statusCode == 0){
          //Navegar al Dashboard
          this.router.navigateByUrl('/dashboard/profile');
          Swal.fire('OK', 'Tu horario ha sido actualizado.', 'success');
        } else{
          console.warn(resp.statusMessage);
        }
      }, err =>{
        console.warn(err);
      })
  }
}
