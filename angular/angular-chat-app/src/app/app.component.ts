import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router){
    auth.user$.subscribe(user => {
      if(user){
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl)
          router.navigateByUrl('/');
        else
          router.navigateByUrl(returnUrl);
      }
    })
  }
}
