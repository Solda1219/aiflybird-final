import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(private userService : UserService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.userService.isLoggedIn()) {
        this.userService.gotoURL('/meetings');
        return false;
      }
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.userService.isLoggedIn()) {
        this.userService.gotoURL('/meetings');
        return false;
      }
    return true;
  }
}