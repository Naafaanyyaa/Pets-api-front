import {Component, OnInit} from '@angular/core';
import {IIconButton} from "../../../shared/components/icon-button/models/icon-button.interface";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";

@Component({
  selector: 'app-component-page',
  templateUrl: './component-page.component.html',
  styleUrls: ['./component-page.component.css']
})
export class ComponentPageComponent implements OnInit{

  public inputParameters: MainButtonInterface = {
    classes: "dark",
    icon: faEye,
    link: "/lol",
    size: "small",
    text: "Edit"
  }
  ngOnInit(): void {
  }
}
