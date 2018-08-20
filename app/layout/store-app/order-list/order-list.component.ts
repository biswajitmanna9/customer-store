import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { StoreAppService } from "../../../core/services/store-app.service";
import { LoadingIndicator } from "nativescript-loading-indicator";

@Component({
    selector: '',
    moduleId: module.id,
    templateUrl: `order-list.component.html`,
    styleUrls: [`order-list.component.css`]
})
export class StoreAppOrderListComponent implements OnInit {
    app_id: string;
    user_id: string;
    order_list: any = [];
    loader = new LoadingIndicator();
    lodaing_options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: true,
            cancelListener: function (dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6",
            backgroundColor: "yellow",
            userInteractionEnabled: false,
            hideBezel: true,
        }
    }
    items: any[];
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService
    ) {}

    ngOnInit() {
        this.loader.show(this.lodaing_options);
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = getString('user_id');
        console.log(this.app_id)
        this.getOrderList()
    }

    getDiscount(price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
    }

    getOrderList() {
        var param = '?customer=' + this.user_id + '&appmaster=' + this.app_id;
        this.storeAppService.getCustomerOrderListByApp(param).subscribe(
            res => {
                this.loader.hide();
                console.log(res);
                this.order_list = res['results'];
                for (var i = 0; i < this.order_list.length; i++) {
                    this.order_list[i]['items'] = JSON.parse(JSON.stringify(this.order_list[i].order_details));
                }
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }
}