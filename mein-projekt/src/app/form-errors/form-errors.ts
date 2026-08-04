import { Component, input, computed, effect, signal } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.html',
  styleUrl: './form-errors.css',
})
export class FormErrors {
  control = input<AbstractControl | null>(null);

  private tick = signal(0);

  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();
      if (ctrl){
        const sub = ctrl.events.subscribe(() => this.tick.update(v => v + 1));
        onCleanup(() => sub.unsubscribe());
      }
    })
  }

  patternMessage = input<string>('Ungültiges Format.');
  minLengthMessage = input<string>('Ungültiges Format.');
  maxLengthMessage = input<string>('Ungültiges Format.');

  touched = computed(() => { this.tick(); return this.control()?.touched; });
  hasRequiredError = computed(() => { this.tick(); return this.control()?.hasError('required'); });
  hasEmailError = computed( ()=> {this.tick(); return this.control()?.hasError('email');});
  hasPatternError = computed(() => {this.tick(); return this.control()?.hasError('pattern')});
  hasMinError = computed(() => {this.tick(); return this.control()?.hasError('minlength')});
  hasMaxError = computed(() => {this.tick(); return this.control()?.hasError('maxlength')});
}
