import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean>{
      return this.userService.validateToken()
            .pipe(
              tap(isAuthenticated =>{

                if(isAuthenticated.statusCode != 0){
                  this.router.navigateByUrl('/login');
                }

              }),
              map(resp =>true),
              catchError(error => of(false))
            );
  }
  
}
