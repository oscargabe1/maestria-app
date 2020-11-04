import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Appointment } from "../../../models/appointment.model";
import { User } from "../../../models/user.model";
import { AppointmentService } from "../../../services/appointment.service";
import { ScheduleService } from "../../../services/schedule.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  user:User;
  others:Array<User>;
  type:number;
  toggledButton;

  doctor:number;


  public appointmentForm = this.fb.group({
    user: ['', [Validators.required]],
    doctor: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', []],
    treatment: ['', [Validators.required]],
    notes: ['', []],
  });


  schedule:Array<any> = [];
  dateDisplay;
  selectedDate = false;
  

  constructor(private activatedRoute:ActivatedRoute, public appointmentService:AppointmentService, public userService:UserService, public scheduleService:ScheduleService, private fb: FormBuilder, public router:Router) { }

  ngOnInit() {
    this.getDoctorsPatients();
    console.log(this.doctor);
    console.log("bruv");
  }

  getDoctorsPatients(){
    this.userService.getDoctorsPatients()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset.selfUser;
        this.others = resp.resultset.otherUsers;
        this.type = resp.resultset.selfUserType;

        this.populateFields();
        if(this.type == 2){
          this.switchDoctor(this.user.userID);
        }
      })
  }

  switchDoctor(doctorID:number){
    this.doctor = doctorID;
    this.getSchedule(doctorID);
  }

  getSchedule(doctorID:number){
    this.scheduleService.getSchedule(doctorID)
      .subscribe(resp =>{
        console.log(resp);
        this.schedule = resp.resultset; 
      })
  }

  populateFields(){
    if (this.type == 2) {
      this.appointmentForm.controls['doctor'].setValue(this.user.userName + ' - ' + this.user.userSpecialty);
    } else {
      this.appointmentForm.controls['user'].setValue(this.user.userName);
    }
  }


  toggleButtons(buttonID){
    console.log(buttonID);
    this.toggledButton = buttonID;
    this.appointmentForm.controls['start_date'].setValue(this.toggledButton);
    console.log(this.toggledButton);

    //Mobile display

    let date = new Date(parseInt(this.toggledButton+'000'));
    date.setHours(date.getHours()+6);
    this.dateDisplay = date;
    this.selectedDate = true;


  }

  postAppointment(){
    this.appointmentForm.controls['doctor'].setValue(this.user.userID);

    if (this.appointmentForm.valid) {
      this.appointmentService.addAppointment(this.appointmentForm.value)
      .subscribe(resp => {
        console.log(resp);
        console.log("POST");
        if(resp.statusCode == 0){
          //Navegar al Dashboard
          Swal.fire('OK', 'La consulta ha sido creada.', 'success');
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/appointments');
          }, 1000);
        } else{
          console.warn(resp.statusMessage);
        }
      }, err =>{
        console.warn(err);
      })
    }
  }
}
