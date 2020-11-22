import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  constructor(private userService:UserService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean>{
      return this.userService.validateToken()
            .pipe(
              tap(isAuthenticated =>{

                let userID = localStorage.getItem('userID');

                console.log("patient");
                if(isAuthenticated.resultset.userType != 3){
                  this.router.navigateByUrl('/dashboard/appointments');
                }

                // if(isAuthenticated.resultset.userID != userID){
                //   this.router.navigateByUrl('/login');
                // }


              }),
              map(resp =>true),
              catchError(error => of(false))
            );
  }
  
}
