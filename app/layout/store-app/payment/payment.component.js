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
        this.paymentOptions = [
            new store_app_service_1.RadioOption("Paytm", 0),
            new store_app_service_1.RadioOption("Cash On Delivery", 1)
        ];
        this.paymentOptions[0]['selected'] = true;
        this.payment_type = this.paymentOptions[0]['id'];
    };
    StoreAppPaymentComponent.prototype.changeCheckedRadioPaymentMode = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        this.payment_type = radioOption.id;
        if (!radioOption.selected) {
            return;
        }
        // uncheck all other options
        this.paymentOptions.forEach(function (option) {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
        console.log(this.payment_type);
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
            _this.radioOptions[0]['selected'] = true;
            _this.address_id = _this.radioOptions[0]['id'];
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
            this.loader.show(this.lodaing_options);
            this.order.customer = this.user_id;
            this.order.price = this.total_item_price + this.total_packing_price;
            this.order.address = this.address_id;
            this.order.appmaster = this.app_id;
            this.order.payment_type = this.payment_type;
            var all_details_data = [];
            this.customer_cart_data.forEach(function (x) {
                var details_data = new store_app_service_1.OrderDetails();
                console.log(x);
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
            // console.log(JSON.stringify(this.order));
            this.setCartData();
            this.storeAppService.createOrder(this.order).subscribe(function (res) {
                console.log(res);
                if (_this.payment_type == 1) {
                    _this.loader.hide();
                    _this.router.navigate(['/store-app/', _this.app_id, 'payment-success', res['id']]);
                }
                else {
                    _this.getPaytmFormValue(_this.order.price);
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    StoreAppPaymentComponent.prototype.getPaytmFormValue = function (amount) {
        var _this = this;
        this.storeAppService.paytmFormValue(amount).subscribe(function (res) {
            console.log(res);
            _this.paytmFormDetails = res;
            _this.loader.hide();
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
        console.log(new Date());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQW1IO0FBQ25ILDBDQUF5QztBQUN6Qyx3Q0FBb0U7QUFDcEUsaUVBQWtGO0FBQ2xGLGlGQUFrRTtBQUNsRSxrRUFLcUM7QUFDckMsb0NBQXNDO0FBT3RDO0lBeURJLGtDQUNZLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQWMsRUFDZCxXQUF3QjtRQUp4QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFqRHBDLGlCQUFZLEdBQVU7WUFDbEIsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixVQUFVLEVBQUUsRUFBRTtZQUNkLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBR0YseUJBQW9CLEdBQVEsRUFBRSxDQUFDO1FBSS9CLFdBQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7UUFDaEMsb0JBQWUsR0FBRztZQUNkLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFFLFVBQVUsTUFBTSxJ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UTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07WUFDRCxtQkFBVztPQTlEM0Isd0JBQXdCLENBb1pwQztJQUFELCtCQUFDO0NBQUEsQUFwWkQsSUFvWkM7QUFwWlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscywgUmFkaW9PcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhLCBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgUGF5dG0sXHJcbiAgICBPcmRlcixcclxuICAgIFRyYW5zYWN0aW9uQ2FsbGJhY2ssXHJcbiAgICBJT1NDYWxsYmFja1xyXG59IGZyb20gXCJAbnN0dWRpby9uYXRpdmVzY3JpcHQtcGF5dG1cIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncGF5bWVudCcsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IGBwYXltZW50LmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BwYXltZW50LmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBQYXltZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZTtcclxuICAgIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICB0b3RhbF9pdGVtX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wYWNraW5nX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wcmljZTogbnVtYmVyO1xyXG4gICAgYWxsX2NhcnRfZGF0YTogYW55O1xyXG4gICAgb3JkZXI6IE9yZGVyTW9kdWxlO1xyXG4gICAgcGF5dG1Gb3JtRGV0YWlsczogYW55O1xyXG4gICAgcGF5dG06IFBheXRtO1xyXG4gICAgb3JkZXJUb1BheXRtOiBPcmRlciA9IHtcclxuICAgICAgICBNSUQ6IFwiXCIsXHJcbiAgICAgICAgT1JERVJfSUQ6IFwiXCIsXHJcbiAgICAgICAgQ1VTVF9JRDogXCJcIixcclxuICAgICAgICBJTkRVU1RSWV9UWVBFX0lEOiBcIlwiLFxyXG4gICAgICAgIENIQU5ORUxfSUQ6IFwiXCIsXHJcbiAgICAgICAgVFhOX0FNT1VOVDogXCJcIixcclxuICAgICAgICBXRUJTSVRFOiBcIlwiLFxyXG4gICAgICAgIENBTExCQUNLX1VSTDogXCJcIixcclxuICAgICAgICBDSEVDS1NVTUhBU0g6IFwiXCJcclxuICAgIH07XHJcblxyXG4gICAgcmFkaW9PcHRpb25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gICAgY3VzdG9tZXJfYWRyZXNzX2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgc3RhdGVfbGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBhZGRyZXNzX2JveF9rZXk6IGJvb2xlYW47XHJcbiAgICBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG4gICAgbG9kYWluZ19vcHRpb25zID0ge1xyXG4gICAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBwcm9ncmVzczogMC42NSxcclxuICAgICAgICBhbmRyb2lkOiB7XHJcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbiAoZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgICAgICAgbWF4OiAxMDAsXHJcbiAgICAgICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW9zOiB7XHJcbiAgICAgICAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgY29sb3I6IFwiIzRCOUVENlwiLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAgICAgICAgIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWRlQmV6ZWw6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkcmVzc19pZDogbnVtYmVyO1xyXG4gICAgcGF5bWVudF90eXBlOiBudW1iZXI7XHJcbiAgICBwYXltZW50T3B0aW9uczogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UgPSBuZXcgU2VjdXJlU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSBuZXcgT3JkZXJNb2R1bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgICAgICB0aGlzLnBvcHVsYXRlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMucGF5dG0gPSBuZXcgUGF5dG0oKTtcclxuICAgICAgICB0aGlzLmdldEN1c3RvbWVyQWRyZXNzTGlzdCh0aGlzLnVzZXJfaWQpO1xyXG4gICAgICAgIHRoaXMuZ2V0U3RhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHN0YXRlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBwaW5jb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBjdXN0b21lcjogW3RoaXMudXNlcl9pZCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBheW1lbnRPcHRpb25zID0gW1xyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJQYXl0bVwiLCAwKSxcclxuICAgICAgICAgICAgbmV3IFJhZGlvT3B0aW9uKFwiQ2FzaCBPbiBEZWxpdmVyeVwiLCAxKVxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLnBheW1lbnRPcHRpb25zWzBdWydzZWxlY3RlZCddID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBheW1lbnRfdHlwZSA9IHRoaXMucGF5bWVudE9wdGlvbnNbMF1bJ2lkJ11cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQ2hlY2tlZFJhZGlvUGF5bWVudE1vZGUocmFkaW9PcHRpb246IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgcmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5wYXltZW50X3R5cGUgPSByYWRpb09wdGlvbi5pZFxyXG4gICAgICAgIGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xyXG4gICAgICAgIHRoaXMucGF5bWVudE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXltZW50X3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc19pZCA9IHJhZGlvT3B0aW9uLmlkXHJcbiAgICAgICAgaWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bmNoZWNrIGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hZGRyZXNzX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAgICAgICAga2V5OiBcImNhcnRcIlxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gZmlsdGVyZWREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXN0b21lckFkcmVzc0xpc3QoaWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRDdXN0b21lckFkZHJlc3MoaWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2FkcmVzc19saXN0ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2FkcmVzc19saXN0LmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgUmFkaW9PcHRpb24oeC5hZGRyZXNzLCB4LmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9PcHRpb25zLnB1c2goZClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhZGlvT3B0aW9uc1swXVsnc2VsZWN0ZWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NfaWQgPSB0aGlzLnJhZGlvT3B0aW9uc1swXVsnaWQnXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdGF0ZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RhdGVMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfbGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX2xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXNbaV1bJ2lkJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJlc1tpXVsnc3RhdGVfbmFtZSddLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXREaXNjb3VudChwcmljZSwgZGlzY291bnRlZF9wcmljZSkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgocHJpY2UgLSBkaXNjb3VudGVkX3ByaWNlKSAqIDEwMCkgLyBwcmljZSkgKyAnJSc7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRUb3RhbEl0ZW1QcmljZSgpIHtcclxuICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHguZGlzY291bnRlZF9wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbF9pdGVtX3ByaWNlICs9ICh4LnByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsUGFja2luZ1ByaWNlKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxfcGFja2luZ19wcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlICs9IHgucGFja2luZ19jaGFyZ2VzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzZXRDYXJ0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2Uuc2V0KHtcclxuICAgICAgICAgICAga2V5OiAnY2FydCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbF9jYXJ0X2RhdGEpXHJcbiAgICAgICAgfSkudGhlbihzdWNjZXNzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VjY2VzcylcclxuICAgICAgICAgICAgdGhpcy5nZXRUb3RhbEl0ZW1QcmljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25jaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlX2xpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFkcmVzc0JveCgpIHtcclxuICAgICAgICB0aGlzLmFkZHJlc3NfYm94X2tleSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQWRyZXNzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybS52YWx1ZSlcclxuICAgICAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5sb2RhaW5nX29wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5hZGRDdXN0b21lckFkZHJlc3ModGhpcy5mb3JtLnZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzX2JveF9rZXkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyQWRyZXNzTGlzdCh0aGlzLnVzZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQodGhpcy5mb3JtKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0ZpZWxkVmFsaWQoZmllbGQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlGaWVsZENzcyhmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2lzLWludmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS5pbnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKSxcclxuICAgICAgICAgICAgJ2lzLXZhbGlkJzogdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBtYXJrRm9ybUdyb3VwVG91Y2hlZChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgICAgICg8YW55Pk9iamVjdCkudmFsdWVzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChjb250cm9sID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XHJcbiAgICAgICAgICAgIGlmIChjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sLmNvbnRyb2xzLmZvckVhY2goYyA9PiB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKGMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvcmRlclBheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZGRyZXNzX2lkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIFNlbGVjdCBTaGlwcGluZyBBZGRyZXNzXCIpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5zaG93KHRoaXMubG9kYWluZ19vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0b21lciA9IHRoaXMudXNlcl9pZDtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5wcmljZSA9IHRoaXMudG90YWxfaXRlbV9wcmljZSArIHRoaXMudG90YWxfcGFja2luZ19wcmljZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5hZGRyZXNzID0gdGhpcy5hZGRyZXNzX2lkO1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyLmFwcG1hc3RlciA9IHRoaXMuYXBwX2lkXHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIucGF5bWVudF90eXBlID0gdGhpcy5wYXltZW50X3R5cGU7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhbGxfZGV0YWlsc19kYXRhID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlsc19kYXRhID0gbmV3IE9yZGVyRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeClcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS5hcHBtYXN0ZXIgPSB4LmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsc19kYXRhLnVuaXRfcHJpY2UgPSB4LmRpc2NvdW50ZWRfcHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEudW5pdF9wcmljZSA9IHgucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEucXVhbnRpdHkgPSB4LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgZGV0YWlsc19kYXRhLnByb2R1Y3QgPSB4LnByb2R1Y3RfaWQ7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEucGFja2FnaW5nX2Nvc3QgPSB4LnBhY2tpbmdfY2hhcmdlcztcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS51b20gPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS5JR1NUID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEuQ0dTVCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgYWxsX2RldGFpbHNfZGF0YS5wdXNoKGRldGFpbHNfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHkgPT4geS5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeS5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeS5wcm9kdWN0X2lkID09IHgucHJvZHVjdF9pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5vcmRlcl9kZXRhaWxzID0gYWxsX2RldGFpbHNfZGF0YTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5vcmRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLnNldENhcnREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmNyZWF0ZU9yZGVyKHRoaXMub3JkZXIpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBheW1lbnRfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RvcmUtYXBwLycsIHRoaXMuYXBwX2lkLCAncGF5bWVudC1zdWNjZXNzJywgcmVzWydpZCddXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF5dG1Gb3JtVmFsdWUodGhpcy5vcmRlci5wcmljZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXl0bUZvcm1WYWx1ZShhbW91bnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLnBheXRtRm9ybVZhbHVlKGFtb3VudCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXl0bUZvcm1EZXRhaWxzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXlWaWFQYXl0bSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBwYXl0bVxyXG4gICAgcGF5VmlhUGF5dG0oKSB7XHJcbiAgICAgICAgdGhpcy5wYXl0bS5zZXRJT1NDYWxsYmFja3Moe1xyXG4gICAgICAgICAgICBkaWRGaW5pc2hlZFJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlkQ2FuY2VsVHJhbnNhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBjYW5jZWxsZWQgdHJhbnNhY3Rpb25cIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWlzc2luZ1BhcmFtZXRlckVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3JkZXJUb1BheXRtID0ge1xyXG4gICAgICAgICAgICBNSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snTUlEJ10sXHJcbiAgICAgICAgICAgIE9SREVSX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ09SREVSX0lEJ10sXHJcbiAgICAgICAgICAgIENVU1RfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ1VTVF9JRCddLFxyXG4gICAgICAgICAgICBJTkRVU1RSWV9UWVBFX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0lORFVTVFJZX1RZUEVfSUQnXSxcclxuICAgICAgICAgICAgQ0hBTk5FTF9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDSEFOTkVMX0lEJ10sXHJcbiAgICAgICAgICAgIFRYTl9BTU9VTlQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snVFhOX0FNT1VOVCddLFxyXG4gICAgICAgICAgICBXRUJTSVRFOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ1dFQlNJVEUnXSxcclxuICAgICAgICAgICAgQ0FMTEJBQ0tfVVJMOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NBTExCQUNLX1VSTCddLFxyXG4gICAgICAgICAgICBDSEVDS1NVTUhBU0g6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0hFQ0tTVU1IQVNIJ11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIHRoaXMucGF5dG0uY3JlYXRlT3JkZXIodGhpcy5vcmRlclRvUGF5dG0pO1xyXG4gICAgICAgIHRoaXMucGF5dG0uaW5pdGlhbGl6ZShcIlNUQUdJTkdcIik7XHJcbiAgICAgICAgdGhpcy5wYXl0bS5zdGFydFBheW1lbnRUcmFuc2FjdGlvbih7XHJcbiAgICAgICAgICAgIHNvbWVVSUVycm9yT2NjdXJyZWQ6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zYWN0aW9uUmVzcG9uc2U6IGZ1bmN0aW9uIChpblJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmV0d29ya05vdEF2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZXR3b3JrIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWVudEF1dGhlbnRpY2F0aW9uRmFpbGVkOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FcnJvckxvYWRpbmdXZWJQYWdlOiBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICAgICBpbmlFcnJvckNvZGUsXHJcbiAgICAgICAgICAgICAgICBpbkVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGluRmFpbGluZ1VybFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluaUVycm9yQ29kZSwgaW5FcnJvck1lc3NhZ2UsIGluRmFpbGluZ1VybCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQmFja1ByZXNzZWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvbiBieSBwcmVzc2luZyBiYWNrIGJ1dHRvblwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25UcmFuc2FjdGlvbkNhbmNlbDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSwgaW5SZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==