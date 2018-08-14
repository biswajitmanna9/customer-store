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
var dialogs = require("ui/dialogs");
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
    };
    StoreAppPaymentComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        this.address_id = radioOption.id;
        if (!radioOption.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions.forEach(function (option) {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
        console.log(this.address_id);
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
            _this.radioOptions = [];
            _this.customer_adress_list.forEach(function (x) {
                var d = new store_app_service_1.RadioOption(x.address, x.id);
                _this.radioOptions.push(d);
            });
            // this.radioOptions[this.radioOptions.length - 1]['selected'] = true;
            // this.address_id = this.radioOptions[this.radioOptions.length - 1]['id']
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
        if (this.address_id == undefined) {
            dialogs.alert("Please Select Shipping Address").then(function () {
                console.log("Dialog closed!");
            });
        }
        else {
            this.order.customer = this.user_id;
            this.order.price = this.total_item_price + this.total_packing_price;
            this.order.address = this.address_id;
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
            console.log(this.order);
            // this.setCartData();
            // this.storeAppService.createOrder(this.order).subscribe(
            //     res => {
            //         console.log(res)
            //         this.router.navigate(['/store-app/', this.app_id, 'payment-success' , res.id])
            //     },
            //     error => {
            //         console.log(error)
            //     }
            // )
            // this.getPaytmFormValue(this.order.price)
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQW1IO0FBQ25ILDBDQUF5QztBQUN6Qyx3Q0FBb0U7QUFDcEUsaUVBQWtGO0FBQ2xGLGlGQUFrRTtBQUNsRSxrRUFLcUM7QUFDckMsb0NBQXNDO0FBT3RDO0lBdURJLGtDQUNZLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQWMsRUFDZCxXQUF3QjtRQUp4QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUEvQ3BDLGlCQUFZLEdBQVU7WUFDbEIsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixVQUFVLEVBQUUsRUFBRTtZQUNkLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBR0YseUJBQW9CLEdBQVEsRUFBRSxDQUFDO1FBSS9CLFdBQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7UUFDaEMsb0JBQWUsR0FBRztZQUNkLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFFLFVBQVUsTUFBTSxJ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QUFDO1lBQ0QsbUJBQW1CLEVBQUUsVUFBVSxjQUFjLEVBQUUsVUFBVTtnQkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvV1Esd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO3lDQXlEcUIsdUJBQWM7WUFDWCxpQkFBUTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07WUFDRCxtQkFBVztPQTVEM0Isd0JBQXdCLENBZ1hwQztJQUFELCtCQUFDO0NBQUEsQUFoWEQsSUFnWEM7QUFoWFksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscywgUmFkaW9PcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhLCBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgUGF5dG0sXHJcbiAgICBPcmRlcixcclxuICAgIFRyYW5zYWN0aW9uQ2FsbGJhY2ssXHJcbiAgICBJT1NDYWxsYmFja1xyXG59IGZyb20gXCJAbnN0dWRpby9uYXRpdmVzY3JpcHQtcGF5dG1cIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncGF5bWVudCcsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IGBwYXltZW50LmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BwYXltZW50LmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBQYXltZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZTtcclxuICAgIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICB0b3RhbF9pdGVtX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wYWNraW5nX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wcmljZTogbnVtYmVyO1xyXG4gICAgYWxsX2NhcnRfZGF0YTogYW55O1xyXG4gICAgb3JkZXI6IE9yZGVyTW9kdWxlO1xyXG4gICAgcGF5dG1Gb3JtRGV0YWlsczogYW55O1xyXG4gICAgcGF5dG06IFBheXRtO1xyXG4gICAgb3JkZXJUb1BheXRtOiBPcmRlciA9IHtcclxuICAgICAgICBNSUQ6IFwiXCIsXHJcbiAgICAgICAgT1JERVJfSUQ6IFwiXCIsXHJcbiAgICAgICAgQ1VTVF9JRDogXCJcIixcclxuICAgICAgICBJTkRVU1RSWV9UWVBFX0lEOiBcIlwiLFxyXG4gICAgICAgIENIQU5ORUxfSUQ6IFwiXCIsXHJcbiAgICAgICAgVFhOX0FNT1VOVDogXCJcIixcclxuICAgICAgICBXRUJTSVRFOiBcIlwiLFxyXG4gICAgICAgIENBTExCQUNLX1VSTDogXCJcIixcclxuICAgICAgICBDSEVDS1NVTUhBU0g6IFwiXCJcclxuICAgIH07XHJcblxyXG4gICAgcmFkaW9PcHRpb25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gICAgY3VzdG9tZXJfYWRyZXNzX2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgc3RhdGVfbGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBhZGRyZXNzX2JveF9rZXk6IGJvb2xlYW47XHJcbiAgICBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG4gICAgbG9kYWluZ19vcHRpb25zID0ge1xyXG4gICAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBwcm9ncmVzczogMC42NSxcclxuICAgICAgICBhbmRyb2lkOiB7XHJcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbiAoZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgICAgICAgbWF4OiAxMDAsXHJcbiAgICAgICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW9zOiB7XHJcbiAgICAgICAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgY29sb3I6IFwiIzRCOUVENlwiLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAgICAgICAgIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWRlQmV6ZWw6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkcmVzc19pZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UgPSBuZXcgU2VjdXJlU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSBuZXcgT3JkZXJNb2R1bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgICAgICB0aGlzLnBvcHVsYXRlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMucGF5dG0gPSBuZXcgUGF5dG0oKTtcclxuICAgICAgICB0aGlzLmdldEN1c3RvbWVyQWRyZXNzTGlzdCh0aGlzLnVzZXJfaWQpO1xyXG4gICAgICAgIHRoaXMuZ2V0U3RhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHN0YXRlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBwaW5jb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBjdXN0b21lcjogW3RoaXMudXNlcl9pZCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc19pZCA9IHJhZGlvT3B0aW9uLmlkXHJcbiAgICAgICAgaWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bmNoZWNrIGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hZGRyZXNzX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAgICAgICAga2V5OiBcImNhcnRcIlxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gZmlsdGVyZWREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXN0b21lckFkcmVzc0xpc3QoaWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRDdXN0b21lckFkZHJlc3MoaWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2FkcmVzc19saXN0ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2FkcmVzc19saXN0LmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgUmFkaW9PcHRpb24oeC5hZGRyZXNzLCB4LmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9PcHRpb25zLnB1c2goZClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJhZGlvT3B0aW9uc1t0aGlzLnJhZGlvT3B0aW9ucy5sZW5ndGggLSAxXVsnc2VsZWN0ZWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmFkZHJlc3NfaWQgPSB0aGlzLnJhZGlvT3B0aW9uc1t0aGlzLnJhZGlvT3B0aW9ucy5sZW5ndGggLSAxXVsnaWQnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdGF0ZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RhdGVMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfbGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX2xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXNbaV1bJ2lkJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJlc1tpXVsnc3RhdGVfbmFtZSddLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXREaXNjb3VudChwcmljZSwgZGlzY291bnRlZF9wcmljZSkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgocHJpY2UgLSBkaXNjb3VudGVkX3ByaWNlKSAqIDEwMCkgLyBwcmljZSkgKyAnJSc7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRUb3RhbEl0ZW1QcmljZSgpIHtcclxuICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHguZGlzY291bnRlZF9wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbF9pdGVtX3ByaWNlICs9ICh4LnByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsUGFja2luZ1ByaWNlKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxfcGFja2luZ19wcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlICs9IHgucGFja2luZ19jaGFyZ2VzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzZXRDYXJ0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2Uuc2V0KHtcclxuICAgICAgICAgICAga2V5OiAnY2FydCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbF9jYXJ0X2RhdGEpXHJcbiAgICAgICAgfSkudGhlbihzdWNjZXNzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VjY2VzcylcclxuICAgICAgICAgICAgdGhpcy5nZXRUb3RhbEl0ZW1QcmljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25jaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlX2xpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFkcmVzc0JveCgpIHtcclxuICAgICAgICB0aGlzLmFkZHJlc3NfYm94X2tleSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQWRyZXNzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybS52YWx1ZSlcclxuICAgICAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5sb2RhaW5nX29wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5hZGRDdXN0b21lckFkZHJlc3ModGhpcy5mb3JtLnZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzX2JveF9rZXkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyQWRyZXNzTGlzdCh0aGlzLnVzZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQodGhpcy5mb3JtKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0ZpZWxkVmFsaWQoZmllbGQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlGaWVsZENzcyhmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2lzLWludmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS5pbnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKSxcclxuICAgICAgICAgICAgJ2lzLXZhbGlkJzogdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBtYXJrRm9ybUdyb3VwVG91Y2hlZChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgICAgICg8YW55Pk9iamVjdCkudmFsdWVzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChjb250cm9sID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XHJcbiAgICAgICAgICAgIGlmIChjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sLmNvbnRyb2xzLmZvckVhY2goYyA9PiB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKGMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvcmRlclBheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZGRyZXNzX2lkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIFNlbGVjdCBTaGlwcGluZyBBZGRyZXNzXCIpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyLmN1c3RvbWVyID0gdGhpcy51c2VyX2lkO1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyLnByaWNlID0gdGhpcy50b3RhbF9pdGVtX3ByaWNlICsgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlO1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyLmFkZHJlc3MgPSB0aGlzLmFkZHJlc3NfaWQ7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuYXBwbWFzdGVyID0gdGhpcy5hcHBfaWRcclxuICAgICAgICAgICAgdmFyIGRldGFpbHNfZGF0YSA9IG5ldyBPcmRlckRldGFpbHMoKTtcclxuICAgICAgICAgICAgdmFyIGFsbF9kZXRhaWxzX2RhdGEgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS5hcHBtYXN0ZXIgPSB4LmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsc19kYXRhLnVuaXRfcHJpY2UgPSB4LmRpc2NvdW50ZWRfcHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEudW5pdF9wcmljZSA9IHgucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEucXVhbnRpdHkgPSB4LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgZGV0YWlsc19kYXRhLnByb2R1Y3QgPSB4LnByb2R1Y3RfaWQ7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEucGFja2FnaW5nX2Nvc3QgPSB4LnBhY2tpbmdfY2hhcmdlcztcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS51b20gPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS5JR1NUID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEuQ0dTVCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgYWxsX2RldGFpbHNfZGF0YS5wdXNoKGRldGFpbHNfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHkgPT4geS5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeS5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeS5wcm9kdWN0X2lkID09IHgucHJvZHVjdF9pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5vcmRlcl9kZXRhaWxzID0gYWxsX2RldGFpbHNfZGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vcmRlcilcclxuICAgICAgICAgICAgLy8gdGhpcy5zZXRDYXJ0RGF0YSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0b3JlQXBwU2VydmljZS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIC8vICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJywgdGhpcy5hcHBfaWQsICdwYXltZW50LXN1Y2Nlc3MnICwgcmVzLmlkXSlcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIClcclxuICAgICAgICAgICAgLy8gdGhpcy5nZXRQYXl0bUZvcm1WYWx1ZSh0aGlzLm9yZGVyLnByaWNlKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBheXRtRm9ybVZhbHVlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UucGF5dG1Gb3JtVmFsdWUoYW1vdW50KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheXRtRm9ybURldGFpbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheVZpYVBheXRtKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHBheXRtXHJcbiAgICBwYXlWaWFQYXl0bSgpIHtcclxuICAgICAgICB0aGlzLnBheXRtLnNldElPU0NhbGxiYWNrcyh7XHJcbiAgICAgICAgICAgIGRpZEZpbmlzaGVkUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvblwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNaXNzaW5nUGFyYW1ldGVyRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcmRlclRvUGF5dG0gPSB7XHJcbiAgICAgICAgICAgIE1JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydNSUQnXSxcclxuICAgICAgICAgICAgT1JERVJfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snT1JERVJfSUQnXSxcclxuICAgICAgICAgICAgQ1VTVF9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDVVNUX0lEJ10sXHJcbiAgICAgICAgICAgIElORFVTVFJZX1RZUEVfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snSU5EVVNUUllfVFlQRV9JRCddLFxyXG4gICAgICAgICAgICBDSEFOTkVMX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NIQU5ORUxfSUQnXSxcclxuICAgICAgICAgICAgVFhOX0FNT1VOVDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydUWE5fQU1PVU5UJ10sXHJcbiAgICAgICAgICAgIFdFQlNJVEU6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snV0VCU0lURSddLFxyXG4gICAgICAgICAgICBDQUxMQkFDS19VUkw6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0FMTEJBQ0tfVVJMJ10sXHJcbiAgICAgICAgICAgIENIRUNLU1VNSEFTSDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDSEVDS1NVTUhBU0gnXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wYXl0bS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyVG9QYXl0bSk7XHJcbiAgICAgICAgdGhpcy5wYXl0bS5pbml0aWFsaXplKFwiU1RBR0lOR1wiKTtcclxuICAgICAgICB0aGlzLnBheXRtLnN0YXJ0UGF5bWVudFRyYW5zYWN0aW9uKHtcclxuICAgICAgICAgICAgc29tZVVJRXJyb3JPY2N1cnJlZDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVHJhbnNhY3Rpb25SZXNwb25zZTogZnVuY3Rpb24gKGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXR3b3JrTm90QXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5ldHdvcmsgbm90IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpZW50QXV0aGVudGljYXRpb25GYWlsZWQ6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVycm9yTG9hZGluZ1dlYlBhZ2U6IGZ1bmN0aW9uIChcclxuICAgICAgICAgICAgICAgIGluaUVycm9yQ29kZSxcclxuICAgICAgICAgICAgICAgIGluRXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgaW5GYWlsaW5nVXJsXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5pRXJyb3JDb2RlLCBpbkVycm9yTWVzc2FnZSwgaW5GYWlsaW5nVXJsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25CYWNrUHJlc3NlZENhbmNlbFRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgY2FuY2VsbGVkIHRyYW5zYWN0aW9uIGJ5IHByZXNzaW5nIGJhY2sgYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zYWN0aW9uQ2FuY2VsOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UsIGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19