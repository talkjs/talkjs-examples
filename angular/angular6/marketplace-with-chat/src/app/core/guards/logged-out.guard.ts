import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['/home']);
        return false;
    }
    return true;
  }
}
