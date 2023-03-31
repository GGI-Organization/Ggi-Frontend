import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginValid: boolean = true;
  public email: string = '';
  public password: string = '';

  constructor(private _rotue: ActivatedRoute, private _router: Router){

  }

  public onSubmit(): void{
    console.log('login', this.email, this.password)
    this.email = ''
    this.password = ''
  }

  public handleRegister(): void{
    this._router.navigateByUrl('/auth/register');
  }

}
