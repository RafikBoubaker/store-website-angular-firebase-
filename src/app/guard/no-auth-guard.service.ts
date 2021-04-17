import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService {

  constructor(private as:AuthService,private route:Router) { }


  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Promise<boolean>
  {
    return new Promise(resolve=>{
        this.as.user.subscribe(user=>{
          if(!user){
            resolve(true)
          }else{
            this.route.navigate(['/'])
            resolve(false)
          }
        })
    })
  }

}