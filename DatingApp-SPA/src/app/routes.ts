import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from './members/member-list/user-detail/user-detail.component';
import {  MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-list/member-card/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists-resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members/:id', component: UserDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver}},
            {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
            canDeactivate: [PreventUnsavedChanges]},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}}
        ]
    },
   {path: '**', redirectTo: 'home', pathMatch: 'full' }
];
