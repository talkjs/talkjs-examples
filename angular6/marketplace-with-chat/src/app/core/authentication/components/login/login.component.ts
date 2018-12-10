import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private toastrService: ToastrService,
    private talkService: TalkService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.loginForm = formBuilder.group({
        username : new FormControl('' , Validators.compose([Validators.required]))
      });
  }

  ngOnInit() { }

  login(credentials) {
    this.authenticationService.login(credentials.username).then(response => {
      if (response) {
        this.toastrService.success('Successful login');
        this.router.navigate(['home']);

        this.talkService.createCurrentSession();
      } else {
        this.toastrService.error('Incorrect credentials');
      }
    });
  }

  getFormControl(name: string) {
    return this.loginForm.controls[name];
  }
}
