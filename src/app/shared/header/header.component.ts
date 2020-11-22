import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../services/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName;
  userType;

  constructor(public sharedService:SharedService, private router:Router) { }

  ngOnInit() {
    this.getName();
    this.getType();
  }

  getName(){
    this.userName = localStorage.getItem('userName') || 'Mi Perfil';
  }

  getType(){
    this.userType = localStorage.getItem('userType');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/login');
  }



}
