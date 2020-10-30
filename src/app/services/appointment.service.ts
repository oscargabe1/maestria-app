import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private router:Router) { }

  getAppointments(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/appointments`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              
              })
            );
  }
}
