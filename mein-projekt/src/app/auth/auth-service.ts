import {inject, Injectable, signal} from '@angular/core';
import {authClient} from './auth-client';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private router = inject(Router);

  isLoggedIn = signal(false);

  async login(email: string, password: string): Promise<boolean>{
    const {data, error} = await authClient.signIn.email({email, password});
    if(error)
      return false;
    this.isLoggedIn.set(true);
    return true;
  }

  async logout(): Promise<void> {
    await authClient.signOut();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  /*async checkSession(): Promise<void> {
    const {data} = await authClient.getSession();
    this.isLoggedIn.set(!!data?.session);
  }*/
}
