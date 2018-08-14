"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("@angular/router");
var forms_1 = require("@angular/forms");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var nativescript_paytm_1 = require("@nstudio/nativescript-paytm");
var StoreAppPaymentComponent = /** @class */ (function () {
    function StoreAppPaymentComponent(route, location, storeAppService, router, formBuilder) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.orderToPaytm = {
            MID: "",
            ORDER_ID: "",
            CUST_ID: "",
            INDUSTRY_TYPE_ID: "",
            CHANNEL_ID: "",
            TXN_AMOUNT: "",
            WEBSITE: "",
            CALLBACK_URL: "",
            CHECKSUMHASH: ""
        };
        this.customer_adress_list = [];
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
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
        this.order = new store_app_service_1.OrderModule();
    }
    StoreAppPaymentComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.populateData();
        this.paytm = new nativescript_paytm_1.Paytm();
        this.getCustomerAdressList(this.user_id);
        this.getStateList();
        this.form = this.formBuilder.group({
            address: ['', forms_1.Validators.required],
            state: ['', forms_1.Validators.required],
            pincode: ['', forms_1.Validators.required],
            customer: [this.user_id, forms_1.Validators.required]
        });
        this.radioOptions = [
            new store_app_service_1.RadioOption("Radio option 1"),
            new store_app_service_1.RadioOption("Radio option 2"),
            new store_app_service_1.RadioOption("Radio option 3")
        ];
    };
    StoreAppPaymentComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions.forEach(function (option) {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
    };
    StoreAppPaymentComponent.prototype.populateData = function () {
        var _this = this;
        this.secureStorage.get({
            key: "cart"
        }).then(function (value) {
            var data = JSON.parse(value);
            console.log(data);
            if (data != null) {
                _this.all_cart_data = data;
                var filteredData = data.filter(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id; });
                _this.customer_cart_data = filteredData;
                _this.getTotalItemPrice();
                _this.getTotalPackingPrice();
                _this.visible_key = true;
            }
            else {
                _this.customer_cart_data = [];
            }
        });
    };
    StoreAppPaymentComponent.prototype.getCustomerAdressList = function (id) {
        var _this = this;
        this.storeAppService.getCustomerAddress(id).subscribe(function (res) {
            console.log(res);
            _this.customer_adress_list = res;
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppPaymentComponent.prototype.getStateList = function () {
        var _this = this;
        this.storeAppService.getStateList().subscribe(function (res) {
            console.log(res);
            _this.state_list = new nativescript_drop_down_1.ValueList();
            for (var i = 0; i < res.length; i++) {
                _this.state_list.push({
                    value: res[i]['id'],
                    display: res[i]['state_name'],
                });
            }
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppPaymentComponent.prototype.getDiscount = function (price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
    };
    StoreAppPaymentComponent.prototype.getTotalItemPrice = function () {
        var _this = this;
        this.total_item_price = 0;
        this.customer_cart_data.forEach(function (x) {
            if (x.discounted_price > 0) {
                _this.total_item_price += (x.discounted_price * x.quantity);
            }
            else {
                _this.total_item_price += (x.price * x.quantity);
            }
        });
    };
    StoreAppPaymentComponent.prototype.getTotalPackingPrice = function () {
        var _this = this;
        this.total_packing_price = 0;
        this.customer_cart_data.forEach(function (x) {
            _this.total_packing_price += x.packing_charges;
        });
    };
    StoreAppPaymentComponent.prototype.setCartData = function () {
        var _this = this;
        this.secureStorage.set({
            key: 'cart',
            value: JSON.stringify(this.all_cart_data)
        }).then(function (success) {
            console.log(success);
            _this.getTotalItemPrice();
            _this.getTotalPackingPrice();
        });
    };
    StoreAppPaymentComponent.prototype.onchange = function (args) {
        this.form.patchValue({
            state: this.state_list.getValue(args.newIndex)
        });
    };
    StoreAppPaymentComponent.prototype.addAdressBox = function () {
        this.address_box_key = true;
    };
    StoreAppPaymentComponent.prototype.addAdress = function () {
        var _this = this;
        console.log(this.form.value);
        if (this.form.valid) {
            this.loader.show(this.lodaing_options);
            this.storeAppService.addCustomerAddress(this.form.value).subscribe(function (res) {
                _this.loader.hide();
                console.log(res);
                _this.address_box_key = false;
                _this.getCustomerAdressList(_this.user_id);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.markFormGroupTouched(this.form);
        }
    };
    StoreAppPaymentComponent.prototype.isFieldValid = function (field) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    };
    StoreAppPaymentComponent.prototype.displayFieldCss = function (field) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    };
    StoreAppPaymentComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    StoreAppPaymentComponent.prototype.orderPay = function () {
        var _this = this;
        this.order.customer = this.user_id;
        this.order.price = this.total_item_price + this.total_packing_price;
        this.order.appmaster = this.app_id;
        var details_data = new store_app_service_1.OrderDetails();
        var all_details_data = [];
        this.customer_cart_data.forEach(function (x) {
            details_data.appmaster = x.app_id;
            if (x.discounted_price > 0) {
                details_data.unit_price = x.discounted_price;
            }
            else {
                details_data.unit_price = x.price;
            }
            details_data.quantity = x.quantity;
            details_data.product = x.product_id;
            details_data.packaging_cost = x.packing_charges;
            details_data.uom = "0";
            details_data.IGST = "0";
            details_data.CGST = "0";
            all_details_data.push(details_data);
            var index = _this.all_cart_data.findIndex(function (y) { return y.customer_id == _this.user_id && y.app_id == _this.app_id && y.product_id == x.product_id; });
            if (index != -1) {
                _this.all_cart_data.splice(index, 1);
            }
        });
        this.order.order_details = all_details_data;
        // this.setCartData();
        // this.storeAppService.createOrder(this.order).subscribe(
        //     res => {
        //         console.log(res)
        //         // this.router.navigate(['/store-app/', this.app_id, 'payment'])
        //     },
        //     error => {
        //         console.log(error)
        //     }
        // )
        // this.getPaytmFormValue(this.order.price)
    };
    StoreAppPaymentComponent.prototype.getPaytmFormValue = function (amount) {
        var _this = this;
        this.storeAppService.paytmFormValue(amount).subscribe(function (res) {
            console.log(res);
            _this.paytmFormDetails = res;
            _this.payViaPaytm();
        }, function (error) {
            console.log(error);
        });
    };
    // paytm
    StoreAppPaymentComponent.prototype.payViaPaytm = function () {
        this.paytm.setIOSCallbacks({
            didFinishedResponse: function (response) {
                console.log(response);
            },
            didCancelTransaction: function () {
                console.log("User cancelled transaction");
            },
            errorMissingParameterError: function (error) {
                console.log(error);
            }
        });
        this.orderToPaytm = {
            MID: this.paytmFormDetails['MID'],
            ORDER_ID: this.paytmFormDetails['ORDER_ID'],
            CUST_ID: this.paytmFormDetails['CUST_ID'],
            INDUSTRY_TYPE_ID: this.paytmFormDetails['INDUSTRY_TYPE_ID'],
            CHANNEL_ID: this.paytmFormDetails['CHANNEL_ID'],
            TXN_AMOUNT: this.paytmFormDetails['TXN_AMOUNT'],
            WEBSITE: this.paytmFormDetails['WEBSITE'],
            CALLBACK_URL: this.paytmFormDetails['CALLBACK_URL'],
            CHECKSUMHASH: this.paytmFormDetails['CHECKSUMHASH']
        };
        this.paytm.createOrder(this.orderToPaytm);
        this.paytm.initialize("STAGING");
        this.paytm.startPaymentTransaction({
            someUIErrorOccurred: function (inErrorMessage) {
                console.log(inErrorMessage);
            },
            onTransactionResponse: function (inResponse) {
                console.log(inResponse);
            },
            networkNotAvailable: function () {
                console.log("Network not available");
            },
            clientAuthenticationFailed: function (inErrorMessage) {
                console.log(inErrorMessage);
            },
            onErrorLoadingWebPage: function (iniErrorCode, inErrorMessage, inFailingUrl) {
                console.log(iniErrorCode, inErrorMessage, inFailingUrl);
            },
            onBackPressedCancelTransaction: function () {
                console.log("User cancelled transaction by pressing back button");
            },
            onTransactionCancel: function (inErrorMessage, inResponse) {
                console.log(inErrorMessage, inResponse);
            }
        });
    };
    StoreAppPaymentComponent = __decorate([
        core_1.Component({
            selector: 'payment',
            moduleId: module.id,
            templateUrl: "payment.component.html",
            styleUrls: ["payment.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService,
            router_2.Router,
            forms_1.FormBuilder])
    ], StoreAppPaymentComponent);
    return StoreAppPaymentComponent;
}());
exports.StoreAppPaymentComponent = StoreAppPaymentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQW1IO0FBQ25ILDBDQUF5QztBQUN6Qyx3Q0FBb0U7QUFDcEUsaUVBQWtGO0FBQ2xGLGlGQUFrRTtBQUNsRSxrRUFLcUM7QUFPckM7SUFzREksa0NBQ1ksS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBYyxFQUNkLFdBQXdCO1FBSnhCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTlDcEMsaUJBQVksR0FBVTtZQUNsQixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUM7UUFHRix5QkFBb0IsR0FBUSxFQUFFLENBQUM7UUFJL0IsV0FBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztRQUNoQyxvQkFBZSxHQUFHO1lBQ2QsT0FBTyxFQUFFLFlBQVk7WUFDckIsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUU7Z0JBQ0wsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixjQUFjLEVBQUUsVUFBVSxNQUFNLElBQUksT0FBTyxDQUFD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QUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQztZQUNELDBCQUEwQixFQUFFLFVBQVUsY0FBYztnQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QscUJBQXFCLEVBQUUsVUFDbkIsWUFBWSxFQUNaLGNBQWMsRUFDZCxZQUFZO2dCQUVaLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsOEJBQThCLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsbUJBQW1CLEVBQUUsVUFBVSxjQUFjLEVBQUUsVUFBVTtnQkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUE5VlEsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO3lDQXdEcUIsdUJBQWM7WUFDWCxpQkFBUTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07WUFDRCxtQkFBVztPQTNEM0Isd0JBQXdCLENBK1ZwQztJQUFELCtCQUFDO0NBQUEsQUEvVkQsSUErVkM7QUEvVlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscywgUmFkaW9PcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhLCBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgUGF5dG0sXHJcbiAgICBPcmRlcixcclxuICAgIFRyYW5zYWN0aW9uQ2FsbGJhY2ssXHJcbiAgICBJT1NDYWxsYmFja1xyXG59IGZyb20gXCJAbnN0dWRpby9uYXRpdmVzY3JpcHQtcGF5dG1cIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3BheW1lbnQnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgcGF5bWVudC5jb21wb25lbnQuaHRtbGAsXHJcbiAgICBzdHlsZVVybHM6IFtgcGF5bWVudC5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwUGF5bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBhcHBfaWQ6IHN0cmluZztcclxuICAgIHNlY3VyZVN0b3JhZ2U6IFNlY3VyZVN0b3JhZ2U7XHJcbiAgICBjdXN0b21lcl9jYXJ0X2RhdGE6IGFueTtcclxuICAgIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gICAgdG90YWxfaXRlbV9wcmljZTogbnVtYmVyO1xyXG4gICAgdG90YWxfcGFja2luZ19wcmljZTogbnVtYmVyO1xyXG4gICAgdG90YWxfcHJpY2U6IG51bWJlcjtcclxuICAgIGFsbF9jYXJ0X2RhdGE6IGFueTtcclxuICAgIG9yZGVyOiBPcmRlck1vZHVsZTtcclxuICAgIHBheXRtRm9ybURldGFpbHM6IGFueTtcclxuICAgIHBheXRtOiBQYXl0bTtcclxuICAgIG9yZGVyVG9QYXl0bTogT3JkZXIgPSB7XHJcbiAgICAgICAgTUlEOiBcIlwiLFxyXG4gICAgICAgIE9SREVSX0lEOiBcIlwiLFxyXG4gICAgICAgIENVU1RfSUQ6IFwiXCIsXHJcbiAgICAgICAgSU5EVVNUUllfVFlQRV9JRDogXCJcIixcclxuICAgICAgICBDSEFOTkVMX0lEOiBcIlwiLFxyXG4gICAgICAgIFRYTl9BTU9VTlQ6IFwiXCIsXHJcbiAgICAgICAgV0VCU0lURTogXCJcIixcclxuICAgICAgICBDQUxMQkFDS19VUkw6IFwiXCIsXHJcbiAgICAgICAgQ0hFQ0tTVU1IQVNIOiBcIlwiXHJcbiAgICB9O1xyXG5cclxuICAgIHJhZGlvT3B0aW9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuICAgIGN1c3RvbWVyX2FkcmVzc19saXN0OiBhbnkgPSBbXTtcclxuICAgIHN0YXRlX2xpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgZm9ybTogRm9ybUdyb3VwO1xyXG4gICAgYWRkcmVzc19ib3hfa2V5OiBib29sZWFuO1xyXG4gICAgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuICAgIGxvZGFpbmdfb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICAgICAgYW5kcm9pZDoge1xyXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24gKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgICAgICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlvczoge1xyXG4gICAgICAgICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIixcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgaGlkZUJlemVsOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZWN1cmVTdG9yYWdlID0gbmV3IFNlY3VyZVN0b3JhZ2UoKTtcclxuICAgICAgICB0aGlzLm9yZGVyID0gbmV3IE9yZGVyTW9kdWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZURhdGEoKTtcclxuICAgICAgICB0aGlzLnBheXRtID0gbmV3IFBheXRtKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lckFkcmVzc0xpc3QodGhpcy51c2VyX2lkKTtcclxuICAgICAgICB0aGlzLmdldFN0YXRlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBhZGRyZXNzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBzdGF0ZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGluY29kZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgY3VzdG9tZXI6IFt0aGlzLnVzZXJfaWQsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIlJhZGlvIG9wdGlvbiAxXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJSYWRpbyBvcHRpb24gMlwiKSxcclxuICAgICAgICAgICAgbmV3IFJhZGlvT3B0aW9uKFwiUmFkaW8gb3B0aW9uIDNcIilcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuICAgICAgICByYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcclxuXHJcbiAgICAgICAgaWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bmNoZWNrIGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5nZXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiY2FydFwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsX2NhcnRfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEgPSBmaWx0ZXJlZERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3RhbEl0ZW1QcmljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG90YWxQYWNraW5nUHJpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1c3RvbWVyQWRyZXNzTGlzdChpZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldEN1c3RvbWVyQWRkcmVzcyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfYWRyZXNzX2xpc3QgPSByZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0YXRlTGlzdCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdGF0ZUxpc3QoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV9saXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfbGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc1tpXVsnaWQnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmVzW2ldWydzdGF0ZV9uYW1lJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldERpc2NvdW50KHByaWNlLCBkaXNjb3VudGVkX3ByaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKChwcmljZSAtIGRpc2NvdW50ZWRfcHJpY2UpICogMTAwKSAvIHByaWNlKSArICclJztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGdldFRvdGFsSXRlbVByaWNlKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgaWYgKHguZGlzY291bnRlZF9wcmljZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSArPSAoeC5kaXNjb3VudGVkX3ByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHgucHJpY2UgKiB4LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxQYWNraW5nUHJpY2UoKSB7XHJcbiAgICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlID0gMDtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2UgKz0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHNldENhcnREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xyXG4gICAgICAgICAgICBrZXk6ICdjYXJ0JyxcclxuICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsX2NhcnRfZGF0YSlcclxuICAgICAgICB9KS50aGVuKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdWNjZXNzKVxyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsSXRlbVByaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VG90YWxQYWNraW5nUHJpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbmNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZm9ybS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGVfbGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkQWRyZXNzQm94KCkge1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc19ib3hfa2V5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRBZHJlc3MoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mb3JtLnZhbHVlKVxyXG4gICAgICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLmxvZGFpbmdfb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmFkZEN1c3RvbWVyQWRkcmVzcyh0aGlzLmZvcm0udmFsdWUpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NfYm94X2tleSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJBZHJlc3NMaXN0KHRoaXMudXNlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrRm9ybUdyb3VwVG91Y2hlZCh0aGlzLmZvcm0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRmllbGRWYWxpZChmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUZpZWxkQ3NzKGZpZWxkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaXMtaW52YWxpZCc6IHRoaXMuZm9ybS5nZXQoZmllbGQpLmludmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpLFxyXG4gICAgICAgICAgICAnaXMtdmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1hcmtGb3JtR3JvdXBUb3VjaGVkKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgKDxhbnk+T2JqZWN0KS52YWx1ZXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbHMuZm9yRWFjaChjID0+IHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQoYykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9yZGVyUGF5KCkge1xyXG4gICAgICAgIHRoaXMub3JkZXIuY3VzdG9tZXIgPSB0aGlzLnVzZXJfaWQ7XHJcbiAgICAgICAgdGhpcy5vcmRlci5wcmljZSA9IHRoaXMudG90YWxfaXRlbV9wcmljZSArIHRoaXMudG90YWxfcGFja2luZ19wcmljZTtcclxuICAgICAgICB0aGlzLm9yZGVyLmFwcG1hc3RlciA9IHRoaXMuYXBwX2lkXHJcbiAgICAgICAgdmFyIGRldGFpbHNfZGF0YSA9IG5ldyBPcmRlckRldGFpbHMoKTtcclxuICAgICAgICB2YXIgYWxsX2RldGFpbHNfZGF0YSA9IFtdXHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLmFwcG1hc3RlciA9IHguYXBwX2lkO1xyXG4gICAgICAgICAgICBpZiAoeC5kaXNjb3VudGVkX3ByaWNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZGV0YWlsc19kYXRhLnVuaXRfcHJpY2UgPSB4LmRpc2NvdW50ZWRfcHJpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEudW5pdF9wcmljZSA9IHgucHJpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLnF1YW50aXR5ID0geC5xdWFudGl0eTtcclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLnByb2R1Y3QgPSB4LnByb2R1Y3RfaWQ7XHJcbiAgICAgICAgICAgIGRldGFpbHNfZGF0YS5wYWNrYWdpbmdfY29zdCA9IHgucGFja2luZ19jaGFyZ2VzO1xyXG4gICAgICAgICAgICBkZXRhaWxzX2RhdGEudW9tID0gXCIwXCI7XHJcbiAgICAgICAgICAgIGRldGFpbHNfZGF0YS5JR1NUID0gXCIwXCI7XHJcbiAgICAgICAgICAgIGRldGFpbHNfZGF0YS5DR1NUID0gXCIwXCI7XHJcbiAgICAgICAgICAgIGFsbF9kZXRhaWxzX2RhdGEucHVzaChkZXRhaWxzX2RhdGEpO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHkgPT4geS5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeS5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeS5wcm9kdWN0X2lkID09IHgucHJvZHVjdF9pZCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMub3JkZXIub3JkZXJfZGV0YWlscyA9IGFsbF9kZXRhaWxzX2RhdGE7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRDYXJ0RGF0YSgpO1xyXG4gICAgICAgIC8vIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmNyZWF0ZU9yZGVyKHRoaXMub3JkZXIpLnN1YnNjcmliZShcclxuICAgICAgICAvLyAgICAgcmVzID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0b3JlLWFwcC8nLCB0aGlzLmFwcF9pZCwgJ3BheW1lbnQnXSlcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyApXHJcbiAgICAgICAgLy8gdGhpcy5nZXRQYXl0bUZvcm1WYWx1ZSh0aGlzLm9yZGVyLnByaWNlKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFBheXRtRm9ybVZhbHVlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UucGF5dG1Gb3JtVmFsdWUoYW1vdW50KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheXRtRm9ybURldGFpbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheVZpYVBheXRtKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHBheXRtXHJcbiAgICBwYXlWaWFQYXl0bSgpIHtcclxuICAgICAgICB0aGlzLnBheXRtLnNldElPU0NhbGxiYWNrcyh7XHJcbiAgICAgICAgICAgIGRpZEZpbmlzaGVkUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvblwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNaXNzaW5nUGFyYW1ldGVyRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcmRlclRvUGF5dG0gPSB7XHJcbiAgICAgICAgICAgIE1JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydNSUQnXSxcclxuICAgICAgICAgICAgT1JERVJfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snT1JERVJfSUQnXSxcclxuICAgICAgICAgICAgQ1VTVF9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDVVNUX0lEJ10sXHJcbiAgICAgICAgICAgIElORFVTVFJZX1RZUEVfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snSU5EVVNUUllfVFlQRV9JRCddLFxyXG4gICAgICAgICAgICBDSEFOTkVMX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NIQU5ORUxfSUQnXSxcclxuICAgICAgICAgICAgVFhOX0FNT1VOVDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydUWE5fQU1PVU5UJ10sXHJcbiAgICAgICAgICAgIFdFQlNJVEU6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snV0VCU0lURSddLFxyXG4gICAgICAgICAgICBDQUxMQkFDS19VUkw6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0FMTEJBQ0tfVVJMJ10sXHJcbiAgICAgICAgICAgIENIRUNLU1VNSEFTSDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDSEVDS1NVTUhBU0gnXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wYXl0bS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyVG9QYXl0bSk7XHJcbiAgICAgICAgdGhpcy5wYXl0bS5pbml0aWFsaXplKFwiU1RBR0lOR1wiKTtcclxuICAgICAgICB0aGlzLnBheXRtLnN0YXJ0UGF5bWVudFRyYW5zYWN0aW9uKHtcclxuICAgICAgICAgICAgc29tZVVJRXJyb3JPY2N1cnJlZDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVHJhbnNhY3Rpb25SZXNwb25zZTogZnVuY3Rpb24gKGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXR3b3JrTm90QXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5ldHdvcmsgbm90IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpZW50QXV0aGVudGljYXRpb25GYWlsZWQ6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVycm9yTG9hZGluZ1dlYlBhZ2U6IGZ1bmN0aW9uIChcclxuICAgICAgICAgICAgICAgIGluaUVycm9yQ29kZSxcclxuICAgICAgICAgICAgICAgIGluRXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgaW5GYWlsaW5nVXJsXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5pRXJyb3JDb2RlLCBpbkVycm9yTWVzc2FnZSwgaW5GYWlsaW5nVXJsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25CYWNrUHJlc3NlZENhbmNlbFRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgY2FuY2VsbGVkIHRyYW5zYWN0aW9uIGJ5IHByZXNzaW5nIGJhY2sgYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zYWN0aW9uQ2FuY2VsOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UsIGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19