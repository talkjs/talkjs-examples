import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from 'src/app/core/authentication/authentication.routing';
import { LoginComponent } from 'src/app/core/authentication/components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  declarations: [LoginComponent]
})
export class AuthenticationModule { }
