import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public fullname:string = '';
  public email:string = '';
  public password: string = '';
  public repassword: string = '';

  constructor(private _route: ActivatedRoute, private _router: Router){

  }

  public onSubmit(): void {

  }

  public handleLogin(): void {
    this._router.navigateByUrl('/auth/login')
  }
}
