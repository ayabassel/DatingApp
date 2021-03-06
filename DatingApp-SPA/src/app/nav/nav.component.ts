import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';
import { error } from 'util';
import { AlertifyService } from '../_Services/Alertify.service';
import { Routes, Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
       this.alertify.success('Logged in successfully');
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message('logged out');
    this.router.navigate(['']);
  }

}
