import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFieldsmatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FieldsmatchDirective,
      multi: true
    }
  ]
})
export class FieldsmatchDirective implements Validators {

  @Input()
  appFieldsmatch!: any

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.value != this.appFieldsmatch.value) {
      return {
        'password_match': true
      }
    }
    return null
  }

  registerOnValidatorChange(fn: () => void) {
    this.subscription = this.appFieldsmatch.valueChanges.subscribe(fn)
  }

  subscription!: Subscription

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  constructor() { }

}
