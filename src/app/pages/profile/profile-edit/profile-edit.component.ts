import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.model";
import { Specialty } from "../../../models/specialty.model";
import { SpecialtyService } from "../../../services/specialty.service";
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user:User;
  specialties:Specialty;

  constructor(public userService:UserService, public specialtyService:SpecialtyService) { }

  ngOnInit() {
    this.getUser();
    this.getSpecialties();
  }
  getUser(){
    this.userService.getUser()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset;
      })
  }
  getSpecialties(){
    this.specialtyService.getSpecialties()
      .subscribe(resp =>{
        console.log(resp);
        this.specialties = resp.resultset;
      })
  }

}
