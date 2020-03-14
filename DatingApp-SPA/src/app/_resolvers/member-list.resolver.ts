import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()

export class MemberListResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUsers().pipe(
            catchError( error => {
                this.alertify.error('Data Retrieving Problem!');
                this.router.navigate(['']);
                return of(null);
            })
        );

    }

}
