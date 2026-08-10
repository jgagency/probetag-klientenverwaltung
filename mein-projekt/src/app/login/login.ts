import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalValues} from '../global-values/global-values';
import {LoginService} from './login-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private globalValues = inject(GlobalValues);
  protected loginService = inject(LoginService);

  ngOnInit() {
    this.globalValues.pageName.set("Login");
    this.globalValues.breadcrumbs.set([
      {label: 'Login'}
    ]);
  }
}
