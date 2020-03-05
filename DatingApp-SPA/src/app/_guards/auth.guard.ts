import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_Services/Auth.service';
import { AlertifyService } from '../_Services/Alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  canActivate(
  ): boolean {

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Not allowed to Pass!!');
    this.router.navigate(['/home']);
    return false;


  }

}
