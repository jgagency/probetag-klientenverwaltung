import { Routes } from '@angular/router';
import { Clients } from './clients/clients';
import { CreateClient } from './create-client/create-client';
import {EditClient} from './edit-client/edit-client';
import {Login} from './login/login';

export const routes: Routes = [
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
  },
  {
    path: 'login', component:Login
  }
];
