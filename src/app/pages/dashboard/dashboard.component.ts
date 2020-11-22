import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from "../../models/user.model";
import { CatalogService } from "../../services/catalog.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loaded = false;
  users;
  constructor(public catalogService:CatalogService) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog(){
    this.catalogService.getCatalog()
      .subscribe(resp =>{  
        
        console.log(resp);
        this.users = resp.resultset;
        this.loaded = true;
      })
  }

}
