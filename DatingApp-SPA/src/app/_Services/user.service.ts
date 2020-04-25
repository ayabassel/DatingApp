import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';
import { AuthService } from './Auth.service';
import { error } from 'protractor';
import { AlertifyService } from './Alertify.service';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

userUpdate(id: number, updatedData: User)  {
  return this.http.put(this.baseUrl + 'users/' + id, updatedData);
}

setMain(photoId: string, userId: number) {
 return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain', {});
}

deletePhoto(userId: number, photoId: string) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId );
}


}
