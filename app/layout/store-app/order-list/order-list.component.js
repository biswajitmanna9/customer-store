"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../../core/services/store-app.service");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var StoreAppOrderListComponent = /** @class */ (function () {
    function StoreAppOrderListComponent(route, location, storeAppService) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.order_list = [];
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        this.lodaing_options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: true,
                cancelListener: function (dialog) { console.log("Loading cancelled"); },
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
        };
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
        ];
    }
    StoreAppOrderListComponent.prototype.ngOnInit = function () {
        this.loader.show(this.lodaing_options);
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        console.log(this.app_id);
        this.getOrderList();
    };
    StoreAppOrderListComponent.prototype.getDiscount = function (price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
    };
    StoreAppOrderListComponent.prototype.getOrderList = function () {
        var _this = this;
        var param = '?customer=' + this.user_id + '&appmaster=' + this.app_id;
        this.storeAppService.getCustomerOrderListByApp(param).subscribe(function (res) {
            _this.loader.hide();
            console.log(res);
            _this.order_list = res['results'];
            for (var i = 0; i < _this.order_list.length; i++) {
                _this.order_list[i]['items'] = JSON.parse(JSON.stringify(_this.order_list[i].order_details));
            }
        }, function (error) {
            _this.loader.hide();
            console.log(error);
        });
    };
    StoreAppOrderListComponent = __decorate([
        core_1.Component({
            selector: '',
            moduleId: module.id,
            templateUrl: "order-list.component.html",
            styleUrls: ["order-list.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService])
    ], StoreAppOrderListComponent);
    return StoreAppOrderListComponent;
}());
exports.StoreAppOrderListComponent = StoreAppOrderListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDZEQUEyRjtBQUMzRiw4RUFBMkU7QUFDM0UsaUZBQWtFO0FBUWxFO0lBNkJJLG9DQUNZLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDO1FBRmhDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBN0I1QyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7UUFDaEMsb0JBQWUsR0FBRztZQUNkLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFFLFVBQVUsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxDQUFDLENBQUM7Z0JBQ3RFLEdBQUcsRUFBRSxHQUFHO2dCQUNSLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixpQkFBaUIsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsZUFBZSxFQUFFLFFBQVE7Z0JBQ3pCLHNCQUFzQixFQUFFLEtBQUs7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJO2FBQ2xCO1NBQ0osQ0FBQTtR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ZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJycsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IGBvcmRlci1saXN0LmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BvcmRlci1saXN0LmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBPcmRlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgICB1c2VyX2lkOiBzdHJpbmc7XHJcbiAgICBvcmRlcl9saXN0OiBhbnkgPSBbXTtcclxuICAgIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbiAgICBsb2RhaW5nX29wdGlvbnMgPSB7XHJcbiAgICAgICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgICAgIGFuZHJvaWQ6IHtcclxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uIChkaWFsb2cpIHsgY29uc29sZS5sb2coXCJMb2FkaW5nIGNhbmNlbGxlZFwiKSB9LFxyXG4gICAgICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICAgICAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgICAgICAgIHNlY29uZGFyeVByb2dyZXNzOiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpb3M6IHtcclxuICAgICAgICAgICAgZGV0YWlsczogXCJBZGRpdGlvbmFsIGRldGFpbCBub3RlIVwiLFxyXG4gICAgICAgICAgICBtYXJnaW46IDEwLFxyXG4gICAgICAgICAgICBkaW1CYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcclxuICAgICAgICAgICAgdXNlckludGVyYWN0aW9uRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZGVCZXplbDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpdGVtczogYW55W107XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgICAgICAgICBcInByaWNlXCI6IFwiMjAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19wYWlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxOC0wOC0xMVQwNjoyMToyOC44MDMxOTFaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGl2ZXJ5X3N0YXR1c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwib3JkZXJfaWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwidHhuX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogMSxcclxuICAgICAgICAgICAgICAgIFwic2hpcHBpbmdfYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3RhdGVcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0YXRlX25hbWVcIjogXCJ3YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIjogXCJpbmRpYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJrZ3AsaW5kYSx3YixtZWRpbmlwdXJnaGpnZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicGluY29kZVwiOiBcIjcyMTMwNVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IDIsXHJcbiAgICAgICAgICAgICAgICBcInByaWNlXCI6IFwiMjAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19wYWlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxOC0wOC0xMVQwNjoyNjo0OS40NTQ4MTdaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGl2ZXJ5X3N0YXR1c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwib3JkZXJfaWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwidHhuX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwic2hpcHBpbmdfYWRkcmVzc1wiOiB7fSxcclxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiAzLFxyXG4gICAgICAgICAgICAgICAgXCJwcmljZVwiOiBcIjIwMDAuMDBcIixcclxuICAgICAgICAgICAgICAgIFwiaXNfcGFpZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTgtMDgtMTFUMDY6Mjg6NDIuNDIwMTMwWlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxpdmVyeV9zdGF0dXNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcIm9yZGVyX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInR4bl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInNoaXBwaW5nX2FkZHJlc3NcIjoge30sXHJcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogNCxcclxuICAgICAgICAgICAgICAgIFwicHJpY2VcIjogXCIyMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX3BhaWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA4LTExVDA2OjMxOjUzLjc5MjY1MVpcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsaXZlcnlfc3RhdHVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJvcmRlcl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJ0eG5faWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJzaGlwcGluZ19hZGRyZXNzXCI6IHt9LFxyXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IDUsXHJcbiAgICAgICAgICAgICAgICBcInByaWNlXCI6IFwiMjAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19wYWlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxOC0wOC0xMVQwNjozMzoyOC42NDAzNzNaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGl2ZXJ5X3N0YXR1c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwib3JkZXJfaWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwidHhuX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwic2hpcHBpbmdfYWRkcmVzc1wiOiB7fSxcclxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiA2LFxyXG4gICAgICAgICAgICAgICAgXCJwcmljZVwiOiBcIjIwMDAuMDBcIixcclxuICAgICAgICAgICAgICAgIFwiaXNfcGFpZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTgtMDgtMTFUMDY6MzU6MzkuNzIxMDY5WlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxpdmVyeV9zdGF0dXNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcIm9yZGVyX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInR4bl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInNoaXBwaW5nX2FkZHJlc3NcIjoge30sXHJcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2Nvc3RcIjogXCI0MDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1bml0X3ByaWNlXCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSUdTVFwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNHU1RcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHU1RcIjogXCIyMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWNrYWdpbmdfY29zdFwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVvbV9jdXJyZW5jeV9kZXRhaWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJJbmRpYW5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RfZGV0YWlsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RfbmFtZVwiOiBcIkRlbW8gcHJvZHVjdCA0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByaWNlXCI6IDE4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdF9jb2RlXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpc2NvdW50ZWRfcHJpY2VcIjogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogXCJhYmMsIDIzLHdld2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFja2luZ19jaGFyZ2VzXCI6IDEyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogNyxcclxuICAgICAgICAgICAgICAgIFwicHJpY2VcIjogXCIyMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX3BhaWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA4LTExVDA2OjM1OjU2LjY5OTIzOVpcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsaXZlcnlfc3RhdHVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJvcmRlcl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJ0eG5faWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJzaGlwcGluZ19hZGRyZXNzXCI6IHt9LFxyXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb3N0XCI6IFwiNDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidW5pdF9wcmljZVwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklHU1RcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDR1NUXCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR1NUXCI6IFwiMjAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFja2FnaW5nX2Nvc3RcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1b21fY3VycmVuY3lfZGV0YWlsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbmN5XCI6IFwiSW5kaWFuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X2RldGFpbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X25hbWVcIjogXCJEZW1vIHByb2R1Y3QgNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmljZVwiOiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RfY29kZVwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNjb3VudGVkX3ByaWNlXCI6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFwiYWJjLCAyMyx3ZXdlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhY2tpbmdfY2hhcmdlc1wiOiAxMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IDgsXHJcbiAgICAgICAgICAgICAgICBcInByaWNlXCI6IFwiMjAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19wYWlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxOC0wOC0xMVQwNjozNzoyNi42NTY1MjRaXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGl2ZXJ5X3N0YXR1c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwib3JkZXJfaWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwidHhuX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwic2hpcHBpbmdfYWRkcmVzc1wiOiB7fSxcclxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29zdFwiOiBcIjQwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVuaXRfcHJpY2VcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJR1NUXCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ0dTVFwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdTVFwiOiBcIjIwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhY2thZ2luZ19jb3N0XCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidW9tX2N1cnJlbmN5X2RldGFpbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIkluZGlhblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdF9kZXRhaWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdF9uYW1lXCI6IFwiRGVtbyBwcm9kdWN0IDRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpY2VcIjogMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X2NvZGVcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzY291bnRlZF9wcmljZVwiOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBcImFiYywgMjMsd2V3ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWNraW5nX2NoYXJnZXNcIjogMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiA5LFxyXG4gICAgICAgICAgICAgICAgXCJwcmljZVwiOiBcIjIwMDAuMDBcIixcclxuICAgICAgICAgICAgICAgIFwiaXNfcGFpZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTgtMDgtMTFUMDY6NDA6MDkuNzY3ODc1WlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxpdmVyeV9zdGF0dXNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcIm9yZGVyX2lkXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInR4bl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBcInNoaXBwaW5nX2FkZHJlc3NcIjoge30sXHJcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2Nvc3RcIjogXCIxNTIwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidW5pdF9wcmljZVwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklHU1RcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDR1NUXCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR1NUXCI6IFwiMjAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFja2FnaW5nX2Nvc3RcIjogXCIxMjIwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidW9tX2N1cnJlbmN5X2RldGFpbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIkluZGlhblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdF9kZXRhaWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdF9uYW1lXCI6IFwiRGVtbyBwcm9kdWN0IDRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpY2VcIjogMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X2NvZGVcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzY291bnRlZF9wcmljZVwiOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBcImFiYywgMjMsd2V3ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWNraW5nX2NoYXJnZXNcIjogMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiAxMCxcclxuICAgICAgICAgICAgICAgIFwicHJpY2VcIjogXCI0MDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX3BhaWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA4LTExVDA2OjQ1OjI3LjMxODgwN1pcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsaXZlcnlfc3RhdHVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJvcmRlcl9pZFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJ0eG5faWRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJzaGlwcGluZ19hZGRyZXNzXCI6IHt9LFxyXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29zdFwiOiBcIjQxMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVuaXRfcHJpY2VcIjogXCIxMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJR1NUXCI6IFwiMTAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ0dTVFwiOiBcIjEwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdTVFwiOiBcIjIwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhY2thZ2luZ19jb3N0XCI6IFwiMTAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1b21fY3VycmVuY3lfZGV0YWlsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbmN5XCI6IFwiSW5kaWFuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X2RldGFpbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0X25hbWVcIjogXCJEZW1vIHByb2R1Y3QgNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmljZVwiOiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RfY29kZVwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNjb3VudGVkX3ByaWNlXCI6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFwiYWJjLCAyMyx3ZXdlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhY2tpbmdfY2hhcmdlc1wiOiAxMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRlci5zaG93KHRoaXMubG9kYWluZ19vcHRpb25zKTtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFwcF9pZClcclxuICAgICAgICB0aGlzLmdldE9yZGVyTGlzdCgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlzY291bnQocHJpY2UsIGRpc2NvdW50ZWRfcHJpY2UpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoKHByaWNlIC0gZGlzY291bnRlZF9wcmljZSkgKiAxMDApIC8gcHJpY2UpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE9yZGVyTGlzdCgpIHtcclxuICAgICAgICB2YXIgcGFyYW0gPSAnP2N1c3RvbWVyPScgKyB0aGlzLnVzZXJfaWQgKyAnJmFwcG1hc3Rlcj0nICsgdGhpcy5hcHBfaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0Q3VzdG9tZXJPcmRlckxpc3RCeUFwcChwYXJhbSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJfbGlzdCA9IHJlc1sncmVzdWx0cyddO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9yZGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyX2xpc3RbaV1bJ2l0ZW1zJ10gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMub3JkZXJfbGlzdFtpXS5vcmRlcl9kZXRhaWxzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59Il19