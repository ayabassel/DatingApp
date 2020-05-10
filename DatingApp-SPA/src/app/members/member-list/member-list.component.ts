import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_Services/user.service';
import { observable, Observable } from 'rxjs';
import { AlertifyService } from '../../_Services/Alertify.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'males'}, {value: 'female', display: 'females'}];
  userPrams: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService , private alertify: AlertifyService) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     // tslint:disable-next-line: no-string-literal
     this.users = data['users'].result;
     this.pagination = data['users'].pagination;

     this.userPrams.gender = this.user.gender === 'male' ? 'female' : 'male';
     this.userPrams.minAge = 18;
     this.userPrams.maxAge = 99;
     this.userPrams.orderBy = 'lastActive';
   });

  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  resetFilters() {
    this.userPrams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userPrams.minAge = 18;
    this.userPrams.maxAge = 99;
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers
    (this.pagination.itemsPerPage, this.pagination.currentPage, this.userPrams).subscribe((response) => {
      this.users = response.result;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

}
