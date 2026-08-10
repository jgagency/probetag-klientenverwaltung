import { Routes } from '@angular/router';
import {authGuard} from './auth/auth-guard';

import { Clients } from './clients/clients';
import { CreateClient } from './create-client/create-client';
import {EditClient} from './edit-client/edit-client';
import {Login} from './login/login';

export const routes: Routes = [
  {
    path: 'login', component: Login
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '', redirectTo: 'klienten/1', pathMatch: 'full'
      },
      {
        path: 'klienten', redirectTo: 'klienten/1', pathMatch: 'full'
      },
      {
        path: 'klienten/:id', component:Clients
      },
      {
        path: 'anlegen', component:CreateClient
      },
      {
        path: 'klient/:id', component:EditClient
      }
    ]
  },

];
