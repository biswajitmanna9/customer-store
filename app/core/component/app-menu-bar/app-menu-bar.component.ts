import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../services/store-app.service";
@Component({
    selector: 'app-menu-bar',
    moduleId: module.id,
    templateUrl: `app-menu-bar.component.html`,
    styleUrls: [`app-menu-bar.component.css`]
})
export class AppMenuBarComponent implements OnInit {
    app_details: any;
    category_list: any = [];
    @Input('appId') appId: string;
    visible_key: boolean
    constructor(
        private route: ActivatedRoute,
        private storeAppService: StoreAppService
    ) {

    }

    ngOnInit() {
        this.getAppDetails(this.appId);
    }

    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.category_list = this.app_details.app_product_categories;
                console.log(res)
                this.visible_key = true;
            },
            error => {
                console.log(error)
            }
        )
    }
}