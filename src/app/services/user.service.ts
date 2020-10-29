import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { UserForm } from '../interfaces/user-form';
import { SharedService } from "./shared.service";
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router:Router, private sharedService:SharedService) { }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/api/endpoint/user/auth`, formData)
            .pipe(
              tap((resp:any) =>{
                localStorage.setItem('token', resp.resultset.token);
                localStorage.setItem('userID', resp.resultset.userID);
                localStorage.setItem('userName', resp.resultset.userName);
              })
            );
  }

  register(formData: RegisterForm){
    return this.http.post(`${base_url}/api/endpoint/user/register`, formData)
            .pipe(
              tap((resp:any) =>{
                localStorage.setItem('token', resp.resultset.token);
                localStorage.setItem('userID', resp.resultset.userID);
                localStorage.setItem('userName', resp.resultset.userName);
              })
            );
  }

  getUser(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/user/profile`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
              
              })
            );
  }

  postUser(formData: UserForm){
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${base_url}/api/endpoint/user/profile`, formData,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
                console.log("postUser");
                localStorage.setItem('userName',resp.resultset.userName);
                this.sharedService.updateHeader();
              })
            );
  }

  validateToken(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/endpoint/user/auth/validate`,{
              headers:{
                'Authorization':token
              }
            }).pipe(
              tap((resp:any) =>{
                localStorage.setItem('userName', resp.resultset.userName);
                localStorage.setItem('userID', resp.resultset.userID);
              })
            );
  }
}
