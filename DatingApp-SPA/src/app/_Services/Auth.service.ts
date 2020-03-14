import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { error } from 'util';
import {JwtHelperService} from '@auth0/angular-jwt';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseURL = environment.apiUrl + 'auth/';
   decodedToken: any;
   jwtHelper: JwtHelperService = new JwtHelperService();

constructor(private http: HttpClient) { }

login(model: any) {
 return this.http.post(this.baseURL + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
      }


    })
    );
}

register(model: any) {
  return this.http.post(this.baseURL + 'register', model);

}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
