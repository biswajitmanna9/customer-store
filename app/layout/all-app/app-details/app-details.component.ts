import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service";
import * as Globals from '../../../core/globals';
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: 'app-details',
    moduleId: module.id,
    templateUrl: `app-details.component.html`,
    styleUrls: [`app-details.component.css`]
})
export class AppDetailsComponent implements OnInit {
    app_id: string;
    app_details: any;
    visible_key: boolean;
    gallery_images: Array<any> = [];
    gallery_visible_key: boolean;
    constructor(
        private route: ActivatedRoute,
        private storeAppService: StoreAppService,
        private routerExtensions: RouterExtensions
    ) {

    }

    ngOnInit() {
        this.app_id = this.route.snapshot.params['id'];
        console.log(this.route.snapshot.params['id'])
        this.getAppDetails(this.app_id)
    }

    goBack() {
        this.routerExtensions.back();
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