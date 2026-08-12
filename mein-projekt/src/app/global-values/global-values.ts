import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValues {
  frontendURL = signal('http://localhost:4200');
  userID = signal('1');

  pageName = signal('');

  userName = signal('');
  userMail = signal('');

  breadcrumbs = signal<{label: string; link?: string}[]>([]);
}
