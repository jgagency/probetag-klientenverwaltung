import {Component, signal, inject, computed} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import {routes} from './app.routes';
import {GlobalValues} from './global-values/global-values';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected globalValues = inject(GlobalValues);
  protected readonly title = signal('mein-projekt');
  protected readonly routes = routes;

  pageName = computed(() => this.globalValues.pageName());
}
