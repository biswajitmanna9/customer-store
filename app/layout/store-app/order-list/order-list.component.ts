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
    ) {
        this.items = [
            {
                "id": 1,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:21:28.803191Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": 1,
                "shipping_address": {
                    "id": 1,
                    "state": {
                        "state_name": "wb",
                        "country": "india"
                    },
                    "address": "kgp,inda,wb,medinipurghjgg",
                    "pincode": "721305"
                },
                "items": []
            },
            {
                "id": 2,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:26:49.454817Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": []
            },
            {
                "id": 3,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:28:42.420130Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": []
            },
            {
                "id": 4,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:31:53.792651Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": []
            },
            {
                "id": 5,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:33:28.640373Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": []
            },
            {
                "id": 6,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:35:39.721069Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": [
                    {
                        "id": 6,
                        "quantity": 1,
                        "total_cost": "400.00",
                        "unit_price": "100.00",
                        "IGST": "100.00",
                        "CGST": "100.00",
                        "GST": "200.00",
                        "packaging_cost": "100.00",
                        "uom_currency_details": {
                            "id": 1,
                            "currency": "Indian"
                        },
                        "product_details": {
                            "id": 1,
                            "product_name": "Demo product 4",
                            "price": 180,
                            "description": null,
                            "product_code": null,
                            "discounted_price": 80,
                            "tags": "abc, 23,wewe",
                            "packing_charges": 12
                        }
                    }
                ]
            },
            {
                "id": 7,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:35:56.699239Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": [
                    {
                        "id": 7,
                        "quantity": 1,
                        "total_cost": "400.00",
                        "unit_price": "100.00",
                        "IGST": "100.00",
                        "CGST": "100.00",
                        "GST": "200.00",
                        "packaging_cost": "100.00",
                        "uom_currency_details": {
                            "id": 1,
                            "currency": "Indian"
                        },
                        "product_details": {
                            "id": 1,
                            "product_name": "Demo product 4",
                            "price": 180,
                            "description": null,
                            "product_code": null,
                            "discounted_price": 80,
                            "tags": "abc, 23,wewe",
                            "packing_charges": 12
                        }
                    }
                ]
            },
            {
                "id": 8,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:37:26.656524Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": [
                    {
                        "id": 8,
                        "quantity": 1,
                        "total_cost": "400.00",
                        "unit_price": "100.00",
                        "IGST": "100.00",
                        "CGST": "100.00",
                        "GST": "200.00",
                        "packaging_cost": "100.00",
                        "uom_currency_details": {
                            "id": 1,
                            "currency": "Indian"
                        },
                        "product_details": {
                            "id": 1,
                            "product_name": "Demo product 4",
                            "price": 180,
                            "description": null,
                            "product_code": null,
                            "discounted_price": 80,
                            "tags": "abc, 23,wewe",
                            "packing_charges": 12
                        }
                    }
                ]
            },
            {
                "id": 9,
                "price": "2000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:40:09.767875Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": [
                    {
                        "id": 9,
                        "quantity": 1,
                        "total_cost": "1520.00",
                        "unit_price": "100.00",
                        "IGST": "100.00",
                        "CGST": "100.00",
                        "GST": "200.00",
                        "packaging_cost": "1220.00",
                        "uom_currency_details": {
                            "id": 1,
                            "currency": "Indian"
                        },
                        "product_details": {
                            "id": 1,
                            "product_name": "Demo product 4",
                            "price": 180,
                            "description": null,
                            "product_code": null,
                            "discounted_price": 80,
                            "tags": "abc, 23,wewe",
                            "packing_charges": 12
                        }
                    }
                ]
            },
            {
                "id": 10,
                "price": "4000.00",
                "is_paid": false,
                "created_at": "2018-08-11T06:45:27.318807Z",
                "delivery_status": false,
                "order_id": null,
                "txn_id": null,
                "address": null,
                "shipping_address": {},
                "items": [
                    {
                        "id": 10,
                        "quantity": 2,
                        "total_cost": "410.00",
                        "unit_price": "100.00",
                        "IGST": "100.00",
                        "CGST": "100.00",
                        "GST": "200.00",
                        "packaging_cost": "10.00",
                        "uom_currency_details": {
                            "id": 1,
                            "currency": "Indian"
                        },
                        "product_details": {
                            "id": 1,
                            "product_name": "Demo product 4",
                            "price": 180,
                            "description": null,
                            "product_code": null,
                            "discounted_price": 80,
                            "tags": "abc, 23,wewe",
                            "packing_charges": 12
                        }
                    }
                ]
            }
        ]

    }

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