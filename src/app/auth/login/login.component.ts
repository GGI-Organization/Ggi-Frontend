import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginValid: boolean = true;
  email: string = '';
  password: string = '';

  constructor(private _router: Router) {
  }

  public onSubmit(): void{
    console.log('login', this.email, this.password)
    this.email = ''
    this.password = ''
    this._router.navigateByUrl('/');
  }

  public handleRegister() {
    this._router.navigateByUrl('/auth/register');
  }

}
