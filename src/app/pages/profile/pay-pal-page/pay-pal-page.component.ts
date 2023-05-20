import {Component, OnInit} from '@angular/core';
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {ProfileService} from "../profile-service/profile-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {SubLinkResponse} from "../models/sub-ink.model";

@Component({
  selector: 'app-pay-pal-page',
  templateUrl: './pay-pal-page.component.html',
  styleUrls: ['./pay-pal-page.component.css']
})
export class PayPalPageComponent implements OnInit{
  public subscriptionButton: MainButtonInterface = {
    classes: "green",
    icon: faMoneyBill,
    link: "/payer-page",
    size: "default",
    text: "Create subscription"
  }

  ngOnInit(): void {
  }
  constructor(private profileService: ProfileService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService) {
  }
  createsubscription():void{
    this.profileService.createSubscription().subscribe({
      next :(data : SubLinkResponse) => {
        this.toastr.warning("Please, relogin");
        window.location.href = data.href;
      },
      error : err => {
        this.toastr.error(err.error);
      }
    })
  }
}
