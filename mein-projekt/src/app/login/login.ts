import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalValues} from '../global-values/global-values';
import {AlertService} from '../alerts/alert-service';

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
  private formBuilder = inject(FormBuilder);
  private alerteService = inject(AlertService)

  loginForm = this.formBuilder.nonNullable.group({
    username: '',
    password: ''
  })

  ngOnInit() {
    this.globalValues.pageName.set("Login");
    this.globalValues.breadcrumbs.set([
      {label: 'Login'}
    ]);
  }

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.loginForm.value.username);
    console.log('Password:', this.loginForm.value.password);
    // Add authentication logic and navigate to the next page upon successful login
    this.alerteService.loginAlert(this.loginForm.value.username);
  }
}
