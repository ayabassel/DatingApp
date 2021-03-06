import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';
import { AuthService } from './Auth.service';
import { error } from 'protractor';
import { AlertifyService } from './Alertify.service';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { Message } from '../_models/Message';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService) { }

getUsers(pageSize?, pageNumber?, userPrams?, likesPram?): Observable<PaginationResult<User[]>> {

  const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

  // tslint:disable-next-line: prefer-const
  let params = new HttpParams();

  if (pageSize != null && pageNumber != null) {
    params = params.append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);
  }

  if (userPrams != null ) {
    params = params.append('gender', userPrams.gender);
    params = params.append('minAge', userPrams.minAge);
    params = params.append('maxAge', userPrams.maxAge);
    params = params.append('orderBy', userPrams.orderBy);

  }

  if (likesPram === 'Likers') {
    params = params.append('Liker', 'true');
  }

  if (likesPram === 'Likees') {
    params = params.append('Likee', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
  .pipe(
    map(response => {
      paginationResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination')) ;
      }

      return paginationResult;
    })
  );
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

likeUser(userId: number, likeeId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/like/' + likeeId, {});
}

getUserMessages(userId: number, pageSize?, pageNumber?, messageState?): Observable<PaginationResult<Message[]>>  {
  const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
  let params = new HttpParams();

  params = params.append('MessageState', messageState);

  if (pageSize != null && pageNumber != null) {
    params = params. append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);
  }

  return this.http.get<Message[]>(this.baseUrl + 'users/' + userId + '/messages', {observe: 'response', params}).pipe(
    map( response => {
      paginationResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }

      return paginationResult;
    })
  );
}

getMessagesThread(userId: number, recipientId: number) {
  return this.http.get<Message[]>(this.baseUrl + 'users/' + userId  + '/messages/thread/' + recipientId);
}

makeMessage(userId: number, message: Message) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages', message);
}

deleteMessage(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markMessageAsRead(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id + '/read', {}).subscribe();
}

}
