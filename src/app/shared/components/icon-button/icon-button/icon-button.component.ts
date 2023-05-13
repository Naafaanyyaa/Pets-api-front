import {Component, Input, OnInit} from '@angular/core';
import {IIconButton} from "../models/icon-button.interface";
import {IInput} from "../../input/models/input.interface";

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit{
  ngOnInit(): void {
  }
  private componentParameters!: IIconButton;
  @Input() set inputParameters(value: IIconButton) {
    this.componentParameters = value;
  }

  get inputParameters(): IIconButton {
    return this.componentParameters;
  }
}
