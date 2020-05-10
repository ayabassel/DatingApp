import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination } from '../_models/Pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_Services/Alertify.service';
import { AuthService } from '../_Services/Auth.service';
import { daLocale } from 'ngx-bootstrap';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likeParam = 'Likers';

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    }
    );
  }

  getUsers() {
    this.userService.getUsers
    (this.pagination.itemsPerPage, this.pagination.currentPage, null, this.likeParam).subscribe((response) => {
      this.users = response.result;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

}
