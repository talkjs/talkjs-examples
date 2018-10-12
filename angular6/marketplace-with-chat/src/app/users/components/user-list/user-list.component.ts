import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().then(users => {
      this.users = users;
    });
  }

  goToUserPage(user: User) {
    this.router.navigate(['users/' + user.id]);
  }

}
