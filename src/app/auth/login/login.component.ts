import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginError = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router:Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  login(){
    console.log(this.loginForm);
    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        if(resp.statusCode == 0){
          if(this.loginForm.get('remember').value){
            localStorage.setItem('email',this.loginForm.get('email').value)
          } else{
            localStorage.removeItem('email');
          }
           //Navegar al Dashboard
           this.router.navigateByUrl('/dashboard');
        } else{
          this.loginError = true;
          console.warn(resp.statusMessage);
        }
      }, err =>{
        console.warn(err);
      })
  }

  loginChange(){
    this.loginError = false;
  }

}
