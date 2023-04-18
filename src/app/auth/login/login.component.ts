import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '', Validators.required ]
  });

  constructor( private router: Router,
               private fb: FormBuilder ) {
  }

  fieldNotValid(field: string) {
    return this.loginForm.controls[field].errors &&
           this.loginForm.controls[field].touched;
  }

  login() {
    if (this.loginForm.invalid) return;
    // TODO: this.userService.login( this.loginForm.value )
    console.log('Login... ', this.loginForm.value);
    this.router.navigateByUrl('/dashboard');
  }

}
