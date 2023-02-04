import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener, DoCheck
} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css',
  '../../../../util.css']
})
export class ErrorComponent implements OnInit, DoCheck{
  public title?:string;
  public message?: string;
  public isAppear?:boolean = true;
  private timer:any;
  @Input() set errorTitle(erTitle:string){
    this.title =erTitle;
  }
  @Input() set errorMessage(erMessage:string){
    this.message = erMessage;
  }

  ngOnInit(): void {
    this.timer = setInterval(()=>{
      this.isAppear = false;
    },6000)
  }

  ngDoCheck(): void {
    if (!this.isAppear){
      clearInterval(this.timer);
    }
  }
}
