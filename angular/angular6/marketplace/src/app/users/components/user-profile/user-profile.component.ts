import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.userService.getUser(this.getUserId()).then(user => {
      this.user = user;
    });
  }

  private getUserId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

}
