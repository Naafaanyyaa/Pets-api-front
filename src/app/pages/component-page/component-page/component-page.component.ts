import {Component, OnInit} from '@angular/core';
import {IIconButton} from "../../../component-iterfaces/icon-button.interface";
import {faEye} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-component-page',
  templateUrl: './component-page.component.html',
  styleUrls: ['./component-page.component.css']
})
export class ComponentPageComponent implements OnInit{
  public iconProp : IIconButton = {
    classes: "default",
    icon: faEye,
    isOutside: true,
    link: "https://www.instagram.com/"

  }

  ngOnInit(): void {
  }
}
