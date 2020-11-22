import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";
import { AppointmentService } from "../../services/appointment.service";
import { ScheduleService } from "../../services/schedule.service";
import { User } from "../../models/user.model";
import { Appointment } from "../../models/appointment.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, public userService:UserService, public appointmentService:AppointmentService, public scheduleService:ScheduleService) { }
  userImg = "/assets/img/img_profile_default.png";
  user:User;

  ngOnInit() {
    this.getUser();
  }
  getUser(){

    this.activatedRoute.params.subscribe(params =>{
      this.userService.getUserDetail(params.id)
        .subscribe(resp =>{
          console.log(resp);
          this.user = resp.resultset;
          this.userImg = resp.resultset.userImg;
        })
    });
  }

}
