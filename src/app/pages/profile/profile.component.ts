import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AppointmentService } from "../../services/appointment.service";
import { ScheduleService } from "../../services/schedule.service";
import { User } from "../../models/user.model";
import { Appointment } from "../../models/appointment.model";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userImg = "/assets/img/img_profile_default.png";
  user:User;
  appointments:Array<Appointment>;
  schedule;
  constructor(public userService:UserService, public appointmentService:AppointmentService, public scheduleService:ScheduleService,) { }

  ngOnInit() {
    this.getAppointments();
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset;
        this.userImg = resp.resultset.userImg;

        this.getSchedule(this.user.userID);
      })
  }

  getAppointments(){
    this.appointmentService.getAppointments()
      .subscribe(resp =>{  
        let finishedAppointmentsArr = [];
        resp.resultset.forEach(appointment => {
          if (appointment.appointmentStatus == 3) {
            finishedAppointmentsArr.push(appointment);
          }
        });
        this.appointments = finishedAppointmentsArr;
        console.log(this.appointments);
        console.log("APPOINTMENTS");
      })
  }
  getSchedule(doctorID:number){
    this.scheduleService.getScheduleDetail(doctorID)
      .subscribe(resp =>{
        console.log(resp);
        console.log("SCHEDULE");
        this.schedule = resp.resultset; 
      })
  }

}
