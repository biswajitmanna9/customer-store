import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { StoreAppService } from '../../../core/services/store-app.service'
import { LoadingIndicator } from "nativescript-loading-indicator";
import * as Globals from '../../../core/globals';

@Component({
    selector: '',
    moduleId: module.id,
    templateUrl: `payment-success.component.html`,
    styleUrls: [`payment-success.component.css`]
})
export class StoreAppPaymentSuccessComponent implements OnInit {
    app_id: string;
    order_id: string;
    user_id: string;
    order: any;
    loader = new LoadingIndicator();
    visible_key: boolean;
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
    currency: string;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService
    ) {

    }

    ngOnInit() {
        this.loader.show(this.lodaing_options);
        this.currency = Globals.currency
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.order_id = full_location[4].trim();
        this.user_id = getString('user_id');
        console.log(this.order_id)
        this.getOrderDetails(this.order_id)
    }

    getOrderDetails(id) {
        this.storeAppService.getOrderDetails(id).subscribe(
            (res: any[]) => {
                console.log(res)
                this.order = res[0];
                this.loader.hide();
                this.visible_key = true;
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }
}