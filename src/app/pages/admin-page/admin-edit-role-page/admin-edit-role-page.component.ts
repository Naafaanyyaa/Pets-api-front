import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-edit-role-page',
  templateUrl: './admin-edit-role-page.component.html',
  styleUrls: ['./admin-edit-role-page.component.css']
})
export class AdminEditRolePageComponent implements OnInit{

  userId?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];
  }



}
