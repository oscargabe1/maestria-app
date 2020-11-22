import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { AppointmentForm } from '../interfaces/appointment-form';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient, private router:Router) { }

  getCatalog(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/usercatalog`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              
              })
            );
  }
}
