import {inject, Injectable, signal} from '@angular/core';
import {authClient} from './auth-client';
import {Router} from '@angular/router';
import {GlobalValues} from '../global-values/global-values';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private router = inject(Router);
  private globalValues = inject(GlobalValues);

  isLoggedIn = signal(false);

  async login(email: string, password: string): Promise<boolean>{
    const {data, error} = await authClient.signIn.email({email, password});
    if(error)
      return false;
    this.isLoggedIn.set(true);
    this.globalValues.userName.set(data?.user?.username ?? null);
    return true;
  }

  async logout(): Promise<void> {
    await authClient.signOut();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  async checkSession(): Promise<void> {
    const {data} = await authClient.getSession();
    this.isLoggedIn.set(!!data?.session);
    this.globalValues.userName.set(data?.user?.displayUsername ?? null);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    return !error;
  }

  async changeUsername(newUsername: string): Promise<boolean> {
    const { error } = await authClient.updateUser({ username: newUsername, displayUsername: newUsername });

    return !error;
  }

  async changeEmail(newEmail: string): Promise<boolean> {
    const { error } = await authClient.changeEmail({
      newEmail,
      callbackURL: this.globalValues.frontendURL() + "/nutzer/" + this.globalValues.userID() + "/general"
    })

    return !error;
  }
}
