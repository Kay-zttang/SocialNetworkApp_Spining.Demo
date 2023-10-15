import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor() { }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.hasError('passwordMismatch')
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  bdaycheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dob = control.value;
      var userdate = new Date();
      var nowdate = new Date();
      let y = dob?.substring(0,4);
      let m = dob?.substring(5,7);
      let d = dob?.substring(8,10);
      userdate.setFullYear(y,m-1,d); //since it started at 0
      nowdate.setFullYear(nowdate.getFullYear()-18);
      if (!control.value
      ) {
        return null;
      }
      if (userdate > nowdate) {
        control?.setErrors({ invaliddate: true });
        return { invaliddate: true };
      } else {
        control?.setErrors(null);
        return null;
      }
    };
  }
}
