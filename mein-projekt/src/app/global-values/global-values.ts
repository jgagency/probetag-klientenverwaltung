import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValues {
  pageName = signal('');
  username = signal('');

  breadcrumbs = signal<{label: string; link?: string}[]>([]);
}
