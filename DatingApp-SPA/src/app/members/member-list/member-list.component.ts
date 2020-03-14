import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_Services/user.service';
import { observable, Observable } from 'rxjs';
import { AlertifyService } from '../../_Services/Alertify.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private route: ActivatedRoute, private userService: UserService , private alertify: AlertifyService) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     // tslint:disable-next-line: no-string-literal
     this.users = data['users'];
   });
  }

  // getUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   }
  //   );
  // }

}
