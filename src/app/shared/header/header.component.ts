import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = 'Mi Perfil';

  constructor() { }

  ngOnInit() {
    this.getName();
  }

  getName(){
    this.userName = localStorage.getItem('userName') || 'Mi Perfil';
  }

}
