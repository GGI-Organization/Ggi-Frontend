import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: [ 'Miguel', Validators.required ],
    email: [ 'johndoe@mail.com', [ Validators.required, Validators.email ]],
    password: [ '123', Validators.required ],
    password2: [ '123', Validators.required ]
  }, {
    Validators: this.equalsPasswords('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private router: Router) {
  }

  equalsPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value)
        pass2Control.setErrors(null)
      else
        pass2Control.setErrors({ isNotEqual: true })
    }
  }

  fieldNotValid(field: string) {
    return this.registerForm.controls[field].errors &&
           this.registerForm.controls[field].touched;
  }

  notValidPasswords() {
    const pass1 = this.registerForm.controls['password'].value;
    const pass2 = this.registerForm.controls['password2'].value;

    return (pass1 !== pass2 && this.formSubmitted) ? true : false;
  }

  register() {
    this.formSubmitted = true;

    if (this.registerForm.invalid || this.notValidPasswords()) return;

    console.log('Register... ', this.registerForm.value);
    this.router.navigateByUrl('/dashboard');
    // TODO: this.userService.postUser(this.registerForm.value)
  }
}
