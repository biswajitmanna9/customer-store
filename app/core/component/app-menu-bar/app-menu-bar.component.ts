import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../services/store-app.service";
@Component({
    selector: 'app-menu-bar',
    moduleId: module.id,
    templateUrl: `app-menu-bar.component.html`,
    styleUrls: [`app-menu-bar.component.css`]
})
export class AppMenuBarComponent implements OnInit {
    app_id: string;
    app_details: any;
    category_list: any = [];
    constructor(
        private route: ActivatedRoute,
        private storeAppService: StoreAppService
    ) {

    }

    ngOnInit() {
        this.app_id = this.route.snapshot.params["id"];
        // console.log(this.route.snapshot.params["id"])
        this.getAppDetails(this.app_id);
    }

    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.category_list = this.app_details.app_product_categories;
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }
}