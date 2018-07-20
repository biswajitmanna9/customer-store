import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service";
import * as Globals from '../../../core/globals';
import { Location } from '@angular/common';
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
}