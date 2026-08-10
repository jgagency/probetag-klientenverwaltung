import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GlobalValues} from '../global-values/global-values';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';

  private globalValues = inject(GlobalValues);

  ngOnInit() {
    this.globalValues.pageName.set("Login");
    this.globalValues.breadcrumbs.set([
      {label: 'Login'}
    ]);
  }

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login
  }
}
