import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service";
import * as Globals from '../../../core/globals';
import { Location } from '@angular/common';
import { registerElement } from 'nativescript-angular/element-registry';
import { StarRating } from 'nativescript-star-ratings-ext';
registerElement('StarRating', () => StarRating);
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Component({
  selector: 'about-us',
  moduleId: module.id,
  templateUrl: `about-us.component.html`,
  styleUrls: [`about-us.component.css`]
})
export class StoreAppAboutUsComponent implements OnInit {
  app_id: string;
  app_details: any;
  visible_key: boolean;
  gallery_images: Array<any> = [];
  gallery_visible_key: boolean;
  value: number;
  max: number;
  user_id: string;
  constructor(
    private route: ActivatedRoute,
    private storeAppService: StoreAppService,
    private location: Location,
  ) {

  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
    this.getAppDetails(this.app_id)
    this.value = 1;
    this.max = 15;
    this.user_id = getString('user_id');
    // console.log(this.app_id)
  }

  getAppDetails(id) {
    this.storeAppService.getStoreAppDetails(id).subscribe(
      res => {
        this.app_details = res;
        if (this.app_details.app_imgs.length > 0) {
          this.app_details.app_imgs.forEach(x => {
            var data = {
              title: this.app_details.business_name,
              url: Globals.img_base_url + x.app_img
            }
            this.gallery_images.push(data)
          })
        }
        this.visible_key = true
        console.log(res)
        console.log(this.gallery_images)
      },
      error => {
        console.log(error)
      }
    )
  }
  toggleGallery() {
    this.gallery_visible_key = !this.gallery_visible_key;
  }

  rateApp() {
    var data = {
      app_master: this.app_id,
      customer: this.user_id,
      rating: this.value
    }
    this.storeAppService.appRate(data).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  getAppRatingValue(){

  }
}