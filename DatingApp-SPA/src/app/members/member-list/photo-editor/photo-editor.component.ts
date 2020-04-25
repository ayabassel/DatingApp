import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/_Services/Auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { error } from 'protractor';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() updateUserPhoto = new EventEmitter<string>();
  photoUrl: string;
  baseUrl = 'http://localhost:5000/api/';
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  currentMain: Photo;
  currentPhoto: Photo;
  indx: number;


  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private http: HttpClient, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeFileUploader();
    this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        this.photos.push(res);
        if (res.isMain)  {
          this.authService.changeMainPhoto(res.url);
          this.authService.currentUser.photoUrl  = res.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));


        }


        // const photo = {
        //   url: res.url,
        //   id: res.id,
        //   isMain: res.isMain,
        //   description: res.description,
        //   dateAdded: res.dateAdded
        // };
        // this.photos.push(photo);

      }
    };

  }
  makeItMain(photo: Photo) {
    this.userService.setMain(photo.id, this.authService.decodedToken.nameid).subscribe( () => {
     this.currentMain = this.photos.filter(p => p.isMain)[0];
     this.currentMain.isMain = false;
     photo.isMain = true;
     this.updateUserPhoto.emit(photo.url);
     this.authService.changeMainPhoto(photo.url);
     this.authService.currentUser.photoUrl = photo.url;
     localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  deletePhoto(photoId: string) {
   this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
      this.alertify.success('The photo is deleted successfully');
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertify.error(error);
    });
   });

  }

}
