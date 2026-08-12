import { Routes } from '@angular/router';
import {authGuard} from './auth/auth-guard';

import { Clients } from './clients/clients';
import {EditClient} from './edit-client/edit-client';
import {Login} from './login/login';
import {UserSettings} from './user-settings/user-settings';
import {UserSettingsUser} from './user-settings-user/user-settings-user';
import {UserSettingsSafety} from './user-settings-safety/user-settings-safety';
import {UserSettingsGeneral} from './user-settings-general/user-settings-general';

export const routes: Routes = [
  {
    path: 'login', component: Login
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '', redirectTo: 'klienten', pathMatch: 'full'
      },
      {
        path: 'klienten', component:Clients
      },
      {
        path: 'klienten/:id', component:EditClient
      },
    ]
  },
  {
    path: 'nutzer/:id',
    canActivate: [authGuard],
    component: UserSettings,
    children: [
      {path: '', redirectTo: 'nutzer', pathMatch: 'full'},
      {path: 'nutzer', component:UserSettingsUser},
      {path: 'general', component:UserSettingsGeneral},
      {path: 'sicherheit', component:UserSettingsSafety}
    ]
  }

];
