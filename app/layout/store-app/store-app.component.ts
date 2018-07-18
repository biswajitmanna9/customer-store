import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../core/services/store-app.service";
import * as Globals from '../../core/globals';
@Component({
  selector: 'store-app',
  moduleId: module.id,
  templateUrl: `store-app.component.html`,
  styleUrls: [`store-app.component.css`]
})
export class StoreAppComponent implements OnInit {
  app_id: string;
  app_details: any;
  visible_key: boolean;
  gallery_images: Array<any> = [];
  gallery_visible_key: boolean;
  constructor(
    private route: ActivatedRoute,
    private storeAppService: StoreAppService
  ) {
    // this.gallery_images = [      
    //   {
    //     title: 'Image 4 (URL)',
    //     url: 'https://unsplash.it/400/300/?image=868'
    //   },
    //   {
    //     title: 'Image 5 (URL)',
    //     url: 'https://unsplash.it/400/300/?image=870'
    //   },
    //   {
    //     title: 'Image 6 (URL)',
    //     url: 'https://unsplash.it/400/300/?image=876'
    //   },
    // ];
  }

  ngOnInit() {
    this.app_id = this.route.snapshot.params["id"];
    this.getAppDetails(this.app_id)
    // console.log(this.route.snapshot.params["id"])
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