import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValues {
  pageName = signal('');

  breadcrumbs = signal<{label: string; link?: string}[]>([]);
}
