import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from 'src/app/core/authentication/authentication.routing';
import { LoginComponent } from 'src/app/core/authentication/components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthenticationModule { }
