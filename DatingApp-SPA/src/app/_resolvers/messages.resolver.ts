import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_Services/Auth.service';
import { Message } from '../_models/Message';
@Injectable()

export class MessagesResolver implements Resolve<Message[]> {

    pageNumber = 1;
    pageSize = 5;
    messageState = 'Unread';


    // tslint:disable-next-line: max-line-length
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

    resolve(): Observable<Message[]> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUserMessages(this.authService.decodedToken.nameid,
             this.pageSize, this.pageNumber, this.messageState).pipe(
            catchError( error => {
                this.alertify.error('Data Retrieving your Problem!');
                this.router.navigate(['/members']);
                return of(null);
            })
        );

    }

}
