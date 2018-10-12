import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService, 
      private toastrService: ToastrService) { }

  canActivate() {
    if (!this.authenticationService.isLoggedIn()) {
        this.router.navigate(['/home']);
        this.toastrService.warning('Please log in first.');
        return false;
    }
    return true;
  }
}
