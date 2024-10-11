import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
  standalone: true
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') controlNames: string[] = [];

  validate(formGroup: AbstractControl): ValidationErrors | null {
    const passwordControl = formGroup.get(this.controlNames[0]);
    const confirmPasswordControl = formGroup.get(this.controlNames[1]);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }
}
