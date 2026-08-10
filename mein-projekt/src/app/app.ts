import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import {routes} from './app.routes';
import {BreadcrumbNavigation} from './breadcrumb-navigation/breadcrumb-navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, BreadcrumbNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mein-projekt');
  protected readonly routes = routes;

  setPaths(): void{

  }
}
