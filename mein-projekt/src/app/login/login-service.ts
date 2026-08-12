import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth-service';
import {AlertService} from '../alerts/alert-service';
import {FormBuilder} from '@angular/forms';
import {GlobalValues} from '../global-values/global-values';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private alertService = inject(AlertService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private globalValues = inject(GlobalValues);

  errorMessage = signal<string | null>(null);

  loginForm = this.formBuilder.nonNullable.group({
    username: '',
    password: ''
  })

  async logIn() {
    this.errorMessage.set(null);

    const success = await this.authService.login(this.loginForm.value.username, this.loginForm.value.password);

    if(success){
      this.alertService.loginAlert(this.globalValues.userName());
      await this.router.navigate([""]);
    }
    else{
      this.alertService.loginFailedAlert();
    }
  }

  async logOut() {
    await this.authService.logout();
    this.globalValues.userName.set("");
  }
}
