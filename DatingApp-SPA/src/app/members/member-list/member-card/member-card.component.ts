import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { AuthService } from 'src/app/_Services/Auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
  }

  likeUser(id) {
    this.userService.likeUser(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.message('You have just liked this user!');
    }, error => {
      this.alertify.error(error);
    }) ;
  }

}
