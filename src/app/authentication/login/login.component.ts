import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {NgFor} from "@angular/common";
import {AuthenticationRequestModel} from "../../models/authenticationRequestModel.interface";
import {AuthenticationResponseModel} from "../../models/authenticationResponseModel.interface";
import {IInput} from "../../models/input.interface";
import {UserService} from "../../shared/services/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../util.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  receivedUser : AuthenticationResponseModel | undefined;
  showError: boolean = false;
  public loginConfig: IInput = {
    type: 'default',
    placeholder: 'Username..',
    isdisabled: false,
    error:"Error"
  }
  public passwordConfig: IInput = {
    type: 'default',
    placeholder: 'Password..',
    isdisabled: false,
    error:"Error"
  }
  constructor(private authService: UserService) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      "username": new FormControl("", Validators.required),
      "password": new FormControl("",
        [Validators.required
        ])
    })
  }
  // Validators.pattern('"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"')
  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  submit = (loginFormValue:any) => {


    const login = {...loginFormValue};

    const userObject: AuthenticationRequestModel = {
      name: login.username,
      password: login.password
    }

    this.authService.postData(userObject).subscribe({
      next:(data:any) => {this.receivedUser = data},
      error: error => console.log(error)
    });
  }
}
