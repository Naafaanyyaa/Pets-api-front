import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor,  NG_VALUE_ACCESSOR} from "@angular/forms";
import {IInput, definitionInterface } from "../../../../models/input.interface";

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [INPUT_VALUE_ACCESSOR]
})

export class InputComponent implements OnInit, ControlValueAccessor{
  private componentParameters!: IInput;
  private onChange: any;
  private onTouched: any;
  public value: any;
  // @Input() error?: string;
  @Input() type: 'email' | 'password' | 'date' | 'file' | 'text' = 'text';
  @Input() size: 'default' | 'small' | 'big' = 'default';
  @Input() icon?: string;

  @Input() set inputParameters(value: IInput) {
    this.componentParameters = value;
  }
  ngOnInit(): void {
    this.value = '';
  }
  get inputParameters(): IInput {
    return this.componentParameters;
  }
  change(event: any): void {
    this.onChange(event.target.value);
    this.onTouched(event.target.value);
  }
  writeValue(value: string): void {
    this.value = value ? value : ''
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  changeType = (type:string) => {
    if (this.inputParameters.isChangingType){
      if (this.type == "password"){
        this.type = "text"
      }
      else {
        this.type = "password"
      }
    }
  }
}
