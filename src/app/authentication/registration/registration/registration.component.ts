import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IInput} from "../../../models/input.interface";
import {faEye, faSignature, faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../shared/services/user.service";
import {RegistrationRequestModel} from "../../../models/registrationRequestModel.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css','../../../../styles.css', '../../../../util.css'],
  providers:[UserService]
})
export class RegistrationComponent implements OnInit{
  registrationForm!: FormGroup;
  receivedUser : RegistrationRequestModel | undefined;
  error!: string;
  public loginConfig: IInput = {
    type: 'default',
    placeholder: 'Username',
    isDisabled: false,
    error:"Error",
    icon: faUser
  }
  public firstnameConfig: IInput = {
    type: 'default',
    placeholder: 'Firstname',
    isDisabled: false,
    error:"Error",
    icon: faSignature
  }
  public lastnameConfig: IInput = {
    type: 'default',
    placeholder: 'Lastname',
    isDisabled: false,
    error:"Error",
    icon: faSignature
  }
  public passwordConfig: IInput = {
    type: 'default',
    placeholder: 'Password',
    isDisabled: false,
    error:"Error",
    icon: faEye,
    isChangingType : true
  }
  public emailConfig: IInput = {
    type: 'default',
    placeholder: 'Email',
    isDisabled: false,
    error:"Error",
    icon: faEnvelope,
    isChangingType : false
  }
  constructor(private authService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      "username": new FormControl("", [Validators.required, Validators.minLength(8)]),
      "password": new FormControl("", [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]),
      "firstname": new FormControl("", [Validators.required]),
      "lastname":new FormControl("", Validators.required),
      "email": new FormControl("", [Validators.required, Validators.email])
    })
  }
  // Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]).{8,32}$')
  validateControl = (controlName: string) => {
    return this.registrationForm.get(controlName)?.invalid && this.registrationForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.get(controlName)?.hasError(errorName)
  }

  submit = (registrationFormValue:any) => {
    const registration = {...registrationFormValue}

    const registrationRequest: RegistrationRequestModel = {
      Firstname: registration.firstname,
      Lastname: registration.lastname,
      UserName: registration.username,
      Email: registration.email,
      Password: registration.password
    }

    this.authService.registerUser(registrationRequest).subscribe({
      next:() => {this.router.navigate(["/login"])},
      error: error => console.log(error)
    });
  }
}
