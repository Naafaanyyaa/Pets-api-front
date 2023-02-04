import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit{
  @Input()text : string | undefined;
  @Input() disabled: boolean = false;
  ngOnInit(): void {
  }
}
