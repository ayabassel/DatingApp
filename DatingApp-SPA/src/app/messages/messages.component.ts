import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_Services/Alertify.service';
import { AuthService } from '../_Services/Auth.service';
import { UserService } from '../_Services/user.service';
import { Message } from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/Pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageState = 'Unread';

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getUserMessages(this.authService.decodedToken.nameid,
       this.pagination.itemsPerPage, this.pagination.currentPage, this.messageState).subscribe(
         (res: PaginationResult<Message[]>) => {
           this.messages = res.result;
           this.pagination = res.pagination;
         }, error => {
           this.alertify.error(error);
         }
       );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(this.authService.decodedToken.nameid, id).subscribe( () => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('The message has been deleted!');
      }, error => {
        this.alertify.error('Problem occured during deleting message!');
      });
    });
  }

}
