import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth-service';
import {AlertService} from '../alerts/alert-service';
import {GlobalValues} from '../global-values/global-values';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private globalValues = inject(GlobalValues);

  resetForms(): void{
    this.editUsernameForm.reset();
    this.editPasswordForm.reset();
    this.editEmailForm.reset();
  }

  editPasswordForm = this.formBuilder.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validators: this.passwordMatchValidator('newPassword', 'confirmPassword')
  })

  async changePasswordSubmit() {
    if(this.editPasswordForm.value.newPassword !== this.editPasswordForm.value.confirmPassword) {
      this.alertService.dangerAlert("Die Passwörter stimmen nicht überein");
      return;
    }

    const success = await this.authService.changePassword(this.editPasswordForm.value.currentPassword, this.editPasswordForm.value.newPassword)

    if(success){
      this.alertService.successAlert("Das Passwort wurde erfolgreich geändert");
      this.editPasswordForm.reset();
    }
    else
      this.alertService.dangerAlert("Passwort Änderung fehlgeschlagen");
  }

  editUsernameForm = this.formBuilder.nonNullable.group({
    newUsername: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-]+$/)]]
  })

  async changeUsernameSubmit() {
    const success = await this.authService.changeUsername(this.editUsernameForm.value.newUsername);

    if(success){
      this.alertService.successAlert("Dein Benutzername wurde erfolgreich geändert " + this.editUsernameForm.value.newUsername);
      this.globalValues.userName.set(this.editUsernameForm.value.newUsername);
      this.editUsernameForm.reset();
    }
  }

  editEmailForm = this.formBuilder.nonNullable.group({
    newEmail: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]]
  })

  async changeEmailSubmit() {
    const success = await this.authService.changeEmail(this.editEmailForm.value.newEmail);

    if(success){
      this.alertService.successAlert("Die E-Mail Adresse wurde erfolgreich geändert");
      this.editEmailForm.reset();
    }
  }

  passwordMatchValidator(basePassword: string, controlPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(basePassword);
      const matchPassword = formGroup.get(controlPassword);

      if(!password || !matchPassword) return null;
      if(password.value !== matchPassword.value) {
        matchPassword.setErrors({ mismatch: true });
        return { mismatch: true };
      }

      if(matchPassword.hasError('mismatch')){
        const { mismatch, ...restErrors } = matchPassword.errors ?? {};
        matchPassword.setErrors(Object.keys(restErrors).length ? restErrors : null);
      }
      return null;
    }
  }
}
