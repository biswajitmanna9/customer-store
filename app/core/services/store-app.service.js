"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Globals = require("../../core/globals");
var StoreAppService = /** @class */ (function () {
    function StoreAppService(http) {
        this.http = http;
    }
    StoreAppService.prototype.getStoreAppDetails = function (id) {
        return this.http.get(Globals.apiEndpoint + 'app_all_details/' + id + '/');
    };
    StoreAppService.prototype.createOrder = function (data) {
        return this.http.post(Globals.apiEndpoint + 'create_orders/', data);
    };
    StoreAppService.prototype.createChatSessionView = function (param, data) {
        return this.http.post(Globals.apiEndpoint + 'messages/' + param, data);
    };
    StoreAppService.prototype.getMessageListByApp = function (thread) {
        return this.http.get(Globals.apiEndpoint + 'messages/' + thread + "/");
    };
    StoreAppService.prototype.getAppRating = function (customer, app_master) {
        return this.http.get(Globals.apiEndpoint + 'search_rating/?customer=' + customer + '&app_master=' + app_master);
    };
    StoreAppService.prototype.appRate = function (data) {
        return this.http.post(Globals.apiEndpoint + 'add_rating/', data);
    };
    StoreAppService.prototype.paytmFormValue = function (order_amount) {
        return this.http.get(Globals.apiEndpoint + 'get_payment_details/?order_amount=' + order_amount + '&type=app');
    };
    StoreAppService.prototype.getCustomerAddress = function (customer) {
        return this.http.get(Globals.apiEndpoint + 'customer_address/' + customer + '/');
    };
    StoreAppService.prototype.addCustomerAddress = function (data) {
        return this.http.post(Globals.apiEndpoint + 'customer_address/', data);
    };
    StoreAppService.prototype.getStateList = function () {
        return this.http.get(Globals.apiEndpoint + 'states_dropdown/');
    };
    StoreAppService.prototype.getCustomerDetails = function (id) {
        return this.http.get(Globals.apiEndpoint + 'customer_details/' + id + '/');
    };
    StoreAppService.prototype.getCustomerOrderListByApp = function (params) {
        return this.http.get(Globals.apiEndpoint + 'order_details_by_customer_app/' + params);
    };
    StoreAppService.prototype.getSocialMediaListByApp = function (id) {
        return this.http.get(Globals.apiEndpoint + 'app_social_media/' + id);
    };
    StoreAppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], StoreAppService);
    return StoreAppService;
}());
exports.StoreAppService = StoreAppService;
var OrderModule = /** @class */ (function () {
    function OrderModule() {
    }
    return OrderModule;
}());
exports.OrderModule = OrderModule;
var OrderDetails = /** @class */ (function () {
    function OrderDetails() {
    }
    return OrderDetails;
}());
exports.OrderDetails = OrderDetails;
var RadioOption = /** @class */ (function () {
    function RadioOption(text, id) {
        this.selected = false;
        this.text = text;
        this.id = id;
    }
    return RadioOption;
}());
exports.RadioOption = RadioOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FLOEI7QUFHOUIsNENBQThDO0FBRzlDO0lBRUUseUJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDO0lBRXpDLDRDQUFrQixHQUFsQixVQUFtQixFQUFFO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLEtBQUssRUFBRSxJQUFJO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELDZDQUFtQixHQUFuQixVQUFvQixNQUFNO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxRQUFRLEVBQUUsVUFBVTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRywwQkFBMEIsR0FBRyxRQUFRLEdBQUcsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFBO0lBQ2pILENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLFlBQVk7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0NBQW9DLEdBQUcsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFBO0lBQy9HLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsUUFBUTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxzQ0FBWSxHQUFaO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLEVBQUU7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFFRCxtREFBeUIsR0FBekIsVUFBMEIsTUFBTTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQ0FBZ0MsR0FBRyxNQUFNLENBQUUsQ0FBQTtJQUN4RixDQUFDO0lBRUQsaURBQXVCLEdBQXZCLFVBQXdCLEVBQUU7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxDQUFFLENBQUE7SUFDdkUsQ0FBQztJQXREVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR2UsaUJBQVU7T0FGekIsZUFBZSxDQXdEM0I7SUFBRCxzQkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDBDQUFlO0FBMkQ1QjtJQUFBO0lBT0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxrQ0FBVztBQVN4QjtJQUFBO0lBU0EsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxvQ0FBWTtBQVd6QjtJQUtFLHFCQUFZLElBQVksRUFBRSxFQUFVO1FBRnBDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwUGFyYW1zLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2FwcF9hbGxfZGV0YWlscy8nICsgaWQgKyAnLycpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVPcmRlcihkYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoR2xvYmFscy5hcGlFbmRwb2ludCArICdjcmVhdGVfb3JkZXJzLycsIGRhdGEpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGF0U2Vzc2lvblZpZXcocGFyYW0sIGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ21lc3NhZ2VzLycgKyBwYXJhbSwgZGF0YSlcclxuICB9XHJcblxyXG4gIGdldE1lc3NhZ2VMaXN0QnlBcHAodGhyZWFkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ21lc3NhZ2VzLycgKyB0aHJlYWQgKyBcIi9cIilcclxuICB9XHJcblxyXG4gIGdldEFwcFJhdGluZyhjdXN0b21lciwgYXBwX21hc3Rlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdzZWFyY2hfcmF0aW5nLz9jdXN0b21lcj0nICsgY3VzdG9tZXIgKyAnJmFwcF9tYXN0ZXI9JyArIGFwcF9tYXN0ZXIpXHJcbiAgfVxyXG5cclxuICBhcHBSYXRlKGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2FkZF9yYXRpbmcvJywgZGF0YSlcclxuICB9XHJcblxyXG4gIHBheXRtRm9ybVZhbHVlKG9yZGVyX2Ftb3VudCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2dldF9wYXltZW50X2RldGFpbHMvP29yZGVyX2Ftb3VudD0nICsgb3JkZXJfYW1vdW50ICsgJyZ0eXBlPWFwcCcpXHJcbiAgfVxyXG5cclxuICBnZXRDdXN0b21lckFkZHJlc3MoY3VzdG9tZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY3VzdG9tZXJfYWRkcmVzcy8nICsgY3VzdG9tZXIgKyAnLycpXHJcbiAgfVxyXG5cclxuICBhZGRDdXN0b21lckFkZHJlc3MoZGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY3VzdG9tZXJfYWRkcmVzcy8nLCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGVMaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdzdGF0ZXNfZHJvcGRvd24vJylcclxuICB9XHJcblxyXG4gIGdldEN1c3RvbWVyRGV0YWlscyhpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdjdXN0b21lcl9kZXRhaWxzLycgKyBpZCArICcvJylcclxuICB9XHJcblxyXG4gIGdldEN1c3RvbWVyT3JkZXJMaXN0QnlBcHAocGFyYW1zKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ29yZGVyX2RldGFpbHNfYnlfY3VzdG9tZXJfYXBwLycgKyBwYXJhbXMgKVxyXG4gIH1cclxuXHJcbiAgZ2V0U29jaWFsTWVkaWFMaXN0QnlBcHAoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnYXBwX3NvY2lhbF9tZWRpYS8nICsgaWQgKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgT3JkZXJNb2R1bGUge1xyXG4gIGN1c3RvbWVyOiBzdHJpbmc7XHJcbiAgcHJpY2U6IG51bWJlcjtcclxuICBhcHBtYXN0ZXI6IHN0cmluZztcclxuICBhZGRyZXNzOiBudW1iZXI7XHJcbiAgcGF5bWVudF90eXBlOiBudW1iZXI7XHJcbiAgb3JkZXJfZGV0YWlsczogT3JkZXJEZXRhaWxzW11cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9yZGVyRGV0YWlscyB7XHJcbiAgcXVhbnRpdHk6IG51bWJlcjtcclxuICB1bml0X3ByaWNlOiBzdHJpbmc7XHJcbiAgSUdTVDogc3RyaW5nO1xyXG4gIENHU1Q6IHN0cmluZztcclxuICBwYWNrYWdpbmdfY29zdDogc3RyaW5nO1xyXG4gIHVvbTogc3RyaW5nO1xyXG4gIGFwcG1hc3RlcjogbnVtYmVyO1xyXG4gIHByb2R1Y3Q6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmFkaW9PcHRpb24ge1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBpZDogbnVtYmVyO1xyXG4gIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICB9XHJcbn1cclxuIl19