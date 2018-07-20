import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
@Component({
  selector: "cart",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ['./cart.component.css']
})
export class StoreAppCartComponent {
  app_id: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {

  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
  }
}