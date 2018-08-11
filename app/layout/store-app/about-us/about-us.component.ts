import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service";
import * as Globals from '../../../core/globals';
import { Location } from '@angular/common';
import { registerElement } from 'nativescript-angular/element-registry';
import { StarRating } from 'nativescript-star-ratings';
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

  user_id: string;
  rating: any = [1, 2, 3, 4, 5];
  rating_value: number;
  constructor(
    private route: ActivatedRoute,
    private storeAppService: StoreAppService,
    private location: Location,
  ) {

  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
    this.user_id = getString('user_id');
    // console.log(this.app_id)
    this.getAppDetails(this.app_id)
    this.getAppRatingValue();
  }

  getAppDetails(id) {
    this.storeAppService.getStoreAppDetails(id).subscribe(
      res => {
        // res['avg_rating'] = Math.round(res['avg_rating'])
        this.app_details = res;
        if (this.app_details.app_imgs.length > 0) {
          this.app_details.app_imgs.forEach(x => {
            var data = {
              // title: this.app_details.business_name,
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


  rateApp(val) {
    console.log(val)
    var data = {
      app_master: this.app_id,
      customer: this.user_id,
      rating: val
    }
    this.storeAppService.appRate(data).subscribe(
      res => {
        console.log(res)
        this.rating_value = val
      },
      error => {
        console.log(error)
      }
    )
  }

  getAppRatingValue() {
    this.storeAppService.getAppRating(this.user_id, this.app_id).subscribe(
      (res: any[]) => {
        console.log(res)
        if(res.length > 0){
          this.rating_value = res[0]['rating'];
        }        
      },
      error => {
        console.log(error)
      }
    )
  }
}