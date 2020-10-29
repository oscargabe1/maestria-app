import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = this.sharedService.headerUserName || 'Mi Perfil';

  constructor(public sharedService:SharedService) { }

  ngOnInit() {
    //this.getName();
  }

  getName(){
    this.userName = localStorage.getItem('userName') || 'Mi Perfil';
  }

}
