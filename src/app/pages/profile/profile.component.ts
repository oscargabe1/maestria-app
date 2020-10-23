import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userImg = "/assets/img/img_profile_default.png";
  user:User;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset;
        this.userImg = resp.resultset.userImg;
      })
  }

}
