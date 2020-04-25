import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { error } from 'util';
import {JwtHelperService} from '@auth0/angular-jwt';
import { from, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseURL = environment.apiUrl + 'auth/';
   decodedToken: any;
   currentUser: User;
   photoUrl = new BehaviorSubject<string>('../../assets/original.png');
   currentPhotoUrl = this.photoUrl.asObservable();
   jwtHelper: JwtHelperService = new JwtHelperService();

constructor(private http: HttpClient) { }

changeMainPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
 return this.http.post(this.baseURL + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify( user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
        this.photoUrl = user.photoUrl;

      }

    })
    );
}

register(model: User) {
  return this.http.post(this.baseURL + 'register', model);

}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
