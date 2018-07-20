"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../../core/services/store-app.service");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var StoreAppProductsComponent = /** @class */ (function () {
    function StoreAppProductsComponent(route, storeAppService, location) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.location = location;
        this.category_list = [];
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
    }
    StoreAppProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        // this.secureStorage.remove({
        //     key: "cart"
        // }).then(success => console.log("Successfully removed a value? " + success));
        this.secureStorage.get({
            key: "cart"
        }).then(function (value) {
            var data = JSON.parse(value);
            console.log(data);
            if (data != null) {
                _this.customer_cart_data = data;
            }
            else {
                _this.customer_cart_data = [];
            }
            _this.getAppDetails(_this.app_id);
        });
    };
    StoreAppProductsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            _this.category_list = _this.app_details.app_product_categories;
            // console.log(this.customer_cart_data);
            for (var i = 0; i < _this.category_list.length; i++) {
                _this.category_list[i]['items'] = JSON.parse(JSON.stringify(_this.category_list[i].products));
                // isCart implemented
                for (var j = 0; j < _this.category_list[i].items.length; j++) {
                    var index = _this.customer_cart_data.findIndex(function (y) { return y.app_id == _this.category_list[i].items[j].app_master && y.product_id == _this.category_list[i].items[j].id && y.customer_id == _this.user_id; });
                    // console.log(index)
                    if (index != -1) {
                        _this.category_list[i].items[j]['isCart'] = true;
                    }
                    else {
                        _this.category_list[i].items[j]['isCart'] = false;
                    }
                }
            }
            if (_this.category_list.length > 1) {
                _this.accordian_view_key = true;
            }
            else if (_this.category_list.length == 1) {
                _this.list_view_key = true;
            }
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppProductsComponent.prototype.addToCart = function (item) {
        var _this = this;
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
        };
        var index = this.customer_cart_data.findIndex(function (y) { return y.app_id == _this.app_id && y.product_id == item.id && y.customer_id == _this.user_id; });
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
        }).then(function (success) {
            console.log(success);
        });
    };
    StoreAppProductsComponent.prototype.getDiscount = function (price, discounted_price) {
        return ((price - discounted_price) * 100) / 100 + '%';
    };
    StoreAppProductsComponent = __decorate([
        core_1.Component({
            selector: 'products',
            moduleId: module.id,
            templateUrl: "products.component.html",
            styleUrls: ["products.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            store_app_service_1.StoreAppService,
            common_1.Location])
    ], StoreAppProductsComponent);
    return StoreAppProductsComponent;
}());
exports.StoreAppProductsComponent = StoreAppProductsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZHVjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFTM0Y7SUFTSSxtQ0FDWSxLQUFxQixFQUNyQixlQUFnQyxFQUNoQyxRQUFrQjtRQUZsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVQ5QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQVdwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkNBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBd0JDO1FBdkJHLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyw4QkFBOEI7UUFDOUIsa0JBQWtCO1FBQ2xCLCtFQUErRTtRQUUvRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztZQUNuQixHQUFHLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQSxLQUFLO1lBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJ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QUFDO1FBQ0QsdUNBQXVDO1FBRXZDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQ25CLEdBQUcsRUFBRSxNQUFNO1lBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFFLGdCQUFnQjtRQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQS9HUSx5QkFBeUI7UUFQckMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3hDLENBQUM7eUNBWXFCLHVCQUFjO1lBQ0osbUNBQWU7WUFDdEIsaUJBQVE7T0FackIseUJBQXlCLENBZ0hyQztJQUFELGdDQUFDO0NBQUEsQUFoSEQsSUFnSEM7QUFoSFksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Byb2R1Y3RzJyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogYHByb2R1Y3RzLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2Bwcm9kdWN0cy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcFByb2R1Y3RzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgYXBwX2RldGFpbHM6IGFueTtcclxuICAgIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgYWNjb3JkaWFuX3ZpZXdfa2V5OiBib29sZWFuO1xyXG4gICAgbGlzdF92aWV3X2tleTogYm9vbGVhbjtcclxuICAgIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gICAgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZTtcclxuICAgIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UgPSBuZXcgU2VjdXJlU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgICAgIHRoaXMudXNlcl9pZCA9IGdldFN0cmluZygndXNlcl9pZCcpO1xyXG4gICAgICAgIC8vIHRoaXMuc2VjdXJlU3RvcmFnZS5yZW1vdmUoe1xyXG4gICAgICAgIC8vICAgICBrZXk6IFwiY2FydFwiXHJcbiAgICAgICAgLy8gfSkudGhlbihzdWNjZXNzID0+IGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IHJlbW92ZWQgYSB2YWx1ZT8gXCIgKyBzdWNjZXNzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5nZXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiY2FydFwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldFN0b3JlQXBwRGV0YWlscyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHRoaXMuYXBwX2RldGFpbHMuYXBwX3Byb2R1Y3RfY2F0ZWdvcmllcztcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXRlZ29yeV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeV9saXN0W2ldWydpdGVtcyddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNhdGVnb3J5X2xpc3RbaV0ucHJvZHVjdHMpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpc0NhcnQgaW1wbGVtZW50ZWRcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuY2F0ZWdvcnlfbGlzdFtpXS5pdGVtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5maW5kSW5kZXgoeSA9PiB5LmFwcF9pZCA9PSB0aGlzLmNhdGVnb3J5X2xpc3RbaV0uaXRlbXNbal0uYXBwX21hc3RlciAmJiB5LnByb2R1Y3RfaWQgPT0gdGhpcy5jYXRlZ29yeV9saXN0W2ldLml0ZW1zW2pdLmlkICYmIHkuY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeV9saXN0W2ldLml0ZW1zW2pdWydpc0NhcnQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5X2xpc3RbaV0uaXRlbXNbal1bJ2lzQ2FydCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXRlZ29yeV9saXN0Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlhbl92aWV3X2tleSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2F0ZWdvcnlfbGlzdC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdF92aWV3X2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvQ2FydChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyX2lkOiB0aGlzLnVzZXJfaWQsXHJcbiAgICAgICAgICAgIGFwcF9pZDogdGhpcy5hcHBfaWQsXHJcbiAgICAgICAgICAgIHByb2R1Y3RfaWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgIHByb2R1Y3RfbmFtZTogaXRlbS5wcm9kdWN0X25hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBwcm9kdWN0X2NvZGU6IGl0ZW0ucHJvZHVjdF9jb2RlLFxyXG4gICAgICAgICAgICBwcmljZTogaXRlbS5wcmljZSxcclxuICAgICAgICAgICAgZGlzY291bnRlZF9wcmljZTogaXRlbS5kaXNjb3VudGVkX3ByaWNlLFxyXG4gICAgICAgICAgICB0YWdzOiBpdGVtLnRhZ3MsXHJcbiAgICAgICAgICAgIHBhY2tpbmdfY2hhcmdlczogaXRlbS5wYWNraW5nX2NoYXJnZXMsXHJcbiAgICAgICAgICAgIGhpZGVfb3JnX3ByaWNlX3N0YXR1czogaXRlbS5oaWRlX29yZ19wcmljZV9zdGF0dXNcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZmluZEluZGV4KHkgPT4geS5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeS5wcm9kdWN0X2lkID09IGl0ZW0uaWQgJiYgeS5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEpXHJcblxyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xyXG4gICAgICAgICAgICBrZXk6ICdjYXJ0JyxcclxuICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhKVxyXG4gICAgICAgIH0pLnRoZW4oc3VjY2VzcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1Y2Nlc3MpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlzY291bnQocHJpY2UsIGRpc2NvdW50ZWRfcHJpY2UpIHtcclxuICAgICAgICByZXR1cm4gKChwcmljZSAtIGRpc2NvdW50ZWRfcHJpY2UpICogMTAwKSAvIDEwMCArICclJztcclxuICAgIH1cclxufSJdfQ==