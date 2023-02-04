import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationRequestModel} from "../../../models/authenticationRequestModel.interface";
import {AuthenticationResponseModel} from "../../../models/authenticationResponseModel.interface";
import {IInput} from "../../../models/input.interface";
import {UserService} from "../../../shared/services/user.service";
import {faEye, faUser, faPerson} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../util.css','../../../styles.css'],
  providers:[UserService]
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
  constructor(private authService: UserService, private router: Router) {}
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

  submit = (loginFormValue:any) => {


    const login = {...loginFormValue};

    const userObject: AuthenticationRequestModel = {
      name: login.username,
      password: login.password
    }

    this.authService.loginUser(userObject).subscribe({
      next:(data:AuthenticationResponseModel) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(["/"]);
      },
      error: error => console.log(error)
    });
  }
}
