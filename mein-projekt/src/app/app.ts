import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import {BreadcrumbNavigation} from './breadcrumb-navigation/breadcrumb-navigation';
import {Alerts} from './alerts/alerts';
import {LoginService} from './login/login-service';
import {GlobalValues} from './global-values/global-values';
import {AuthService} from './auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, BreadcrumbNavigation, Alerts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected loginService = inject(LoginService);
  protected globalValues = inject(GlobalValues);
  private authService = inject(AuthService);

  /*async ngOnInit() {
    await this.authService.isLoggedIn();
  }*/
}
