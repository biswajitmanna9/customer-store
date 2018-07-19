import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreAppService } from "../../../core/services/store-app.service";
import { Location } from '@angular/common';
import { SecureStorage } from "nativescript-secure-storage";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { Observable } from "tns-core-modules/data/observable";
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
    customer_cart_data: any;
    secureStorage: SecureStorage;
    user_id: string;
    constructor(
        private route: ActivatedRoute,
        private storeAppService: StoreAppService,
        private location: Location,
    ) {
        this.secureStorage = new SecureStorage();
    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = getString('user_id');
        // this.secureStorage.remove({
        //     key: "cart"
        // }).then(success => console.log("Successfully removed a value? " + success));

        this.secureStorage.get({
            key: "cart"
        }).then(
            value => {
                var data = JSON.parse(value);
                console.log(data);
                if (data != null) {
                    this.customer_cart_data = data;
                }
                else {
                    this.customer_cart_data = [];
                }

                this.getAppDetails(this.app_id);
            }
        );
    }

    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.category_list = this.app_details.app_product_categories;
                // console.log(this.customer_cart_data);
                for (var i = 0; i < this.category_list.length; i++) {
                    this.category_list[i]['items'] = JSON.parse(JSON.stringify(this.category_list[i].products));
                    // isCart implemented
                    for (var j = 0; j < this.category_list[i].items.length; j++) {
                        var index = this.customer_cart_data.findIndex(y => y.app_id == this.category_list[i].items[j].app_master && y.product_id == this.category_list[i].items[j].id && y.customer_id == this.user_id);
                        // console.log(index)
                        if (index != -1) {
                            this.category_list[i].items[j]['isCart'] = true;
                        }
                        else {
                            this.category_list[i].items[j]['isCart'] = false;
                        }
                    }
                }
                if (this.category_list.length > 1) {
                    this.accordian_view_key = true
                }
                else if (this.category_list.length == 1) {
                    this.list_view_key = true;
                }
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    addToCart(item) {
        var data = {
            customer_id: this.user_id,
            app_id: this.app_id,
            product_id: item.id,
            product_name: item.product_name,
            description: item.description,
            product_code: item.product_code,
            price: item.price,
            discounted_price: item.discounted_price,
            tags: item.tags,
            packing_charges: item.packing_charges,
            hide_org_price_status: item.hide_org_price_status
        }
        var index = this.customer_cart_data.findIndex(y => y.app_id == this.app_id && y.product_id == item.id && y.customer_id == this.user_id);
        // console.log(index)
        if (index == -1) {
            this.customer_cart_data.push(data);
        }
        else {
            this.customer_cart_data.splice(index, 1);
        }
        // console.log(this.customer_cart_data)

        this.secureStorage.set({
            key: 'cart',
            value: JSON.stringify(this.customer_cart_data)
        }).then(success => {
            console.log(success)
        });
    }

    getDiscount(price, discounted_price) {
        return ((price - discounted_price) * 100) / 100 + '%';
    }
}