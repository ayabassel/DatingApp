import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ErrorInterceptorProvidor } from './_Services/error.interceptor';
import { appRoutes } from './routes';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_Services/Auth.service';
import { UserService } from './_Services/user.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-list/member-card/member-card.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { from } from 'rxjs';
import { UserDetailComponent } from './members/member-list/user-detail/user-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-list/member-card/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AlertifyService } from './_Services/Alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/member-list/photo-editor/photo-editor.component';
import { ListsResolver } from './_resolvers/lists-resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-list/member-messages/member-messages.component';

export function _tokenGetter() {
   return localStorage.getItem('token');
}
export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}
@NgModule({
   declarations: [
      TimeAgoPipe,
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MemberCardComponent,
      MessagesComponent,
      UserDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MemberMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      FileUploadModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ButtonsModule.forRoot(),
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      PaginationModule.forRoot(),
      NgxGalleryModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: _tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000//api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      UserService,
      AlertifyService,
      AuthGuard,
      PreventUnsavedChanges,
      ErrorInterceptorProvidor,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver,
      MessagesResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
