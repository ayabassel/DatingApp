import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor( private userService: UserService, private alertify: AlertifyService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: null
      }
    ];

    this.galleryImages = this.getImages();

  }

  getImages() {
    const imagesUrl = [];
    for (const photo of this.user.photos) {
      imagesUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }
    return imagesUrl;


  }


  // getUser() {
  //   // tslint:disable-next-line: no-string-literal
  //   this.userService.getUser(+this.activatedroute.snapshot.params['id']).subscribe((detailedUser: User) => {
  //     this.user = detailedUser;
  //   }, error => {
  //     this.alertify.error(error);
  //   }
  //   );

  // }


}
