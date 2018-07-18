import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service"
@Component({
    selector: 'products',
    moduleId: module.id,
    templateUrl: `products.component.html`,
    styleUrls: [`products.component.css`]
})

export class StoreAppProductsComponent implements OnInit {
    app_id: string;
    app_details: any;
    category_list: any = [];
    accordian_view_key: boolean;
    list_view_key: boolean;
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
                for (var i = 0; i < this.category_list.length; i++) {
                    this.category_list[i]['items'] = this.category_list[i].products
                }
                if (this.category_list.length > 1) {
                    this.accordian_view_key = true
                }
                else if(this.category_list.length == 1){
                    this.list_view_key = true;
                }
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    addToCart(id) {

    }

    getDiscount(price, discounted_price) {
        return ((price - discounted_price) * 100) / 100 + '%';
    }
}