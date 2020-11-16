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
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedule(doctorID:number){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/schedule/${doctorID}`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              
              })
            );
  }
  getScheduleDetail(doctorID:number){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/scheduleDetail/${doctorID}`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              
              })
            );
  }
  postSchedule(formData){
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${base_url}/api/endpoint/scheduleEdit`, formData,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              })
            );
  }
}
