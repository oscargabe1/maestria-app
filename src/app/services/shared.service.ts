import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  headerUserName = localStorage.getItem('userName') || 'Mi Perfil';

  constructor() { }

  updateHeader(){
    console.log("updated");
    //this.headerComponent.userName = "bruh";
  }
}
