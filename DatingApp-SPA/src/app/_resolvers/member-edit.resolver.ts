import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_Services/Auth.service';
@Injectable()

export class MemberEditResolver implements Resolve<User> {

    // tslint:disable-next-line: max-line-length
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

    resolve(): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError( error => {
                this.alertify.error('Data Retrieving your Problem!');
                this.router.navigate(['/members']);
                return of(null);
            })
        );

    }

}
