import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()

export class MemberListResolver implements Resolve<User> {

    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUsers(this.pageSize, this.pageNumber).pipe(
            catchError( error => {
                this.alertify.error('Data Retrieving Problem!');
                this.router.navigate(['']);
                return of(null);
            })
        );

    }

}
