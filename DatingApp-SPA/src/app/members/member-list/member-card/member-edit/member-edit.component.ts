import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { NgModel } from '@angular/forms';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from 'src/app/_Services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgModel;
  user: User;

 @HostListener('window:beforeunload', ['$event'])
 unloadNotification($event: any) {
   if (this.editForm.dirty) {
      $event.returnValue = true;
   }
 }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService,
    // tslint:disable-next-line: align
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.userUpdate(this.authService.decodedToken.nameid, this.user).subscribe( res => {
      this.alertify.message('Profile Updated Successfully!');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    }
    );

  }

}
