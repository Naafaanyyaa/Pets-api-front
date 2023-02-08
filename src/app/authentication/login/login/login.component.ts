import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationRequestModel} from "../../../models/authenticationRequestModel.interface";
import {AuthenticationResponseModel} from "../../../models/authenticationResponseModel.interface";
import {IInput} from "../../../component-iterfaces/input.interface";
import {UserService} from "../../../shared/services/user.service";
import {faEye, faUser, faPerson} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../../styles.css', '../../../../util.css'],
  providers:[UserService, CookieService]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  receivedUser : AuthenticationResponseModel | undefined;
  public loginConfig: IInput = {
    type: 'default',
    placeholder: 'Username',
    isDisabled: false,
    error:"Error",
    icon: faUser
  }
  public passwordConfig: IInput = {
    type: 'default',
    placeholder: 'Password',
    isDisabled: false,
    error:"Error",
    icon: faEye,
    isChangingType : true
  }
  constructor(private authService: UserService, private CookieService : CookieService, private router: Router) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      "username": new FormControl("", Validators.required),
      "password": new FormControl("",
        [Validators.required
        ])
    })
  }
  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  saveToCookieStorage(token: string): void{
    try {
      const tokenInfo = this.getDecodedAccessToken(token);

      const userInfo = {
        id: tokenInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        username: tokenInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: tokenInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      }
      const exp = tokenInfo.exp;

      this.CookieService.set('token', token, exp);
      this.CookieService.set('user', JSON.stringify(userInfo), exp);

      //TODO: important, how to get user info
      // console.log(JSON.parse(this.CookieService.get('user')));
    } catch(Error) {
      console.log(Error)
    }
  }



  submit = (loginFormValue:any) => {


    const login = {...loginFormValue};

    const userObject: AuthenticationRequestModel = {
      name: login.username,
      password: login.password
    }

    this.authService.loginUser(userObject).subscribe({
      next:(data:AuthenticationResponseModel) => {
        this.saveToCookieStorage(data.token);
        this.router.navigate(["/"]);
      },
      error: error => console.log(error)
    });
  }
}
