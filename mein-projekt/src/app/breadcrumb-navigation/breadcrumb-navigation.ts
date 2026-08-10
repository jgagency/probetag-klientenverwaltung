import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {GlobalValues} from '../global-values/global-values';

@Component({
  selector: 'app-breadcrumb-navigation',
    imports: [
        RouterLink
    ],
  templateUrl: './breadcrumb-navigation.html',
  styleUrl: './breadcrumb-navigation.css',
})
export class BreadcrumbNavigation {

  protected globalValues = inject(GlobalValues);

  pageName = computed(() => this.globalValues.pageName());
}
