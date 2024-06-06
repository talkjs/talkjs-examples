import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from 'src/app/users/components/user-profile/user-profile.component';
import { routing } from 'src/app/users/users.routing';
import { UserListComponent } from 'src/app/users/components/user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [UserProfileComponent, UserListComponent]
})
export class UsersModule { }
