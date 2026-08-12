import {Component, inject, signal} from '@angular/core';
import {GlobalValues} from '../global-values/global-values';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {EditUserService} from '../user-settings-safety/edit-user-service';

@Component({
  selector: 'app-user-settings',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
})
export class UserSettings {
  protected globalValues = inject(GlobalValues);
  private editUserService = inject(EditUserService);

  selectedTab = signal<'nutzer' | 'general' | 'safety'>('nutzer');

  selectTab(tab: typeof this.selectedTab extends {(): infer T} ? T : never): void {
    this.editUserService.resetForms();
    this.selectedTab.set(tab);
  }

  ngOnInit() {
    this.globalValues.pageName.set(this.globalValues.userName());
    this.globalValues.breadcrumbs.set([
      {label: this.globalValues.userName()}
    ]);
  }
}
