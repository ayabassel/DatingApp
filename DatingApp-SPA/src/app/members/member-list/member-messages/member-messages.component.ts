import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { AuthService } from 'src/app/_Services/Auth.service';
import { Message } from 'src/app/_models/Message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, private alertigy: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentId = +this.authService.decodedToken.nameid;
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap((message) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < message.length; i++) {
          if (message[i].recipientId === currentId && message[i].isRead === false) {
            this.userService.markMessageAsRead(currentId, message[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertigy.error(error);
    });
  }

  sendNewMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.makeMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertigy.error(error);
    }
    );
  }

  

}
