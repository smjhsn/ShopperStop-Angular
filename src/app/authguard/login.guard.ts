import { Injectable } from '@angular/core';
import { CanLoad,CanActivate, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../service/common.service';
import { AuthguardService } from '../service/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private route:Router){ }
  canActivate():any{
      var getLocalStorage:any = localStorage.getItem("UserDetails");
      var parse = JSON.parse(getLocalStorage);
    if(parse !== undefined && parse !== null ){
      return true;
    }else{
      this.route.navigate(["login"]);
      return false;
    }
  }
}

// if(this.parseData){
//   if(this.parseData.name != null || this.parseData.name != undefined || this.parseData != ""){
//     return true;
//   }
// }
// return false;
