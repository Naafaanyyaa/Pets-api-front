import {Component, Input, OnInit} from '@angular/core';
import {MainButtonInterface} from "../models/main-button.interface";

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent implements OnInit{
  ngOnInit(): void {
  }
  private componentParameters!: MainButtonInterface;
  @Input() disabled: boolean = false;
  @Input() set inputParameters(value: MainButtonInterface) {
    this.componentParameters = value;
  }

  get inputParameters(): MainButtonInterface {
    return this.componentParameters;
  }
}
