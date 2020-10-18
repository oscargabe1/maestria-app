import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from "../../services/user.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  public registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    type: [false]
  });

  constructor(private router:Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }
  get nameNotValid(){
    return (this.registerForm.get('name').invalid && this.registerForm.get('name').touched && this.formSubmitted) || (this.formSubmitted && this.registerForm.get('name').pristine);
  }
  get emailNotValid(){
    return (this.registerForm.get('email').invalid && this.registerForm.get('email').touched && this.formSubmitted) || (this.formSubmitted && this.registerForm.get('email').pristine);
  }
  get passwordNotValid(){
    return (this.registerForm.get('password').invalid && this.registerForm.get('password').touched && this.formSubmitted) || (this.formSubmitted && this.registerForm.get('password').pristine);
  }
  get passwordConfirmNotValid(){

    if(this.formSubmitted){
      const pass1 = this.registerForm.get('password').value;
      const pass2 = this.registerForm.get('passwordConfirm').value;
  
      return (pass1 == pass2) ? false: true;
    }
  }  
  get typeNotValid(){
    return (this.registerForm.get('type').invalid && this.registerForm.get('type').touched && this.formSubmitted) || (this.formSubmitted && this.registerForm.get('type').pristine);
  }
  

  register(){
    this.formSubmitted = true;
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }
    //Realizar posteo
    this.userService.register(this.registerForm.value)
          .subscribe(resp =>{
             //Navegar al Dashboard
             if(resp.statusCode == 0){
               this.router.navigateByUrl('/dashboard');
             } else{
              Swal.fire('Error', resp.statusMessage, 'error');
             }
          });
  }

}
