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
    StoreAppService.prototype.getAppRating = function (param) {
        return this.http.get(Globals.apiEndpoint + 'add_rating/' + param);
    };
    StoreAppService.prototype.appRate = function (data) {
        return this.http.post(Globals.apiEndpoint + 'add_rating/', data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FLOEI7QUFHOUIsNENBQThDO0FBRzlDO0lBRUUseUJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDO0lBRXpDLDRDQUFrQixHQUFsQixVQUFtQixFQUFFO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLEtBQUssRUFBRSxJQUFJO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELDZDQUFtQixHQUFuQixVQUFvQixNQUFNO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLElBQUk7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQTFCVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR2UsaUJBQVU7T0FGekIsZUFBZSxDQTRCM0I7SUFBRCxzQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLDBDQUFlO0FBK0I1QjtJQUFBO0lBSUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQUFBO0lBU0EsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEhlYWRlcnMsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cFBhcmFtcyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vY29yZS9nbG9iYWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGdldFN0b3JlQXBwRGV0YWlscyhpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdhcHBfYWxsX2RldGFpbHMvJyArIGlkICsgJy8nKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlT3JkZXIoZGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY3JlYXRlX29yZGVycy8nLCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2hhdFNlc3Npb25WaWV3KHBhcmFtLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoR2xvYmFscy5hcGlFbmRwb2ludCArICdtZXNzYWdlcy8nICsgcGFyYW0sIGRhdGEpXHJcbiAgfVxyXG5cclxuICBnZXRNZXNzYWdlTGlzdEJ5QXBwKHRocmVhZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdtZXNzYWdlcy8nICsgdGhyZWFkICsgXCIvXCIpXHJcbiAgfVxyXG5cclxuICBnZXRBcHBSYXRpbmcocGFyYW0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnYWRkX3JhdGluZy8nICsgcGFyYW0pXHJcbiAgfVxyXG5cclxuICBhcHBSYXRlKGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2FkZF9yYXRpbmcvJywgZGF0YSlcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE9yZGVyTW9kdWxlIHtcclxuICBjdXN0b21lcjogc3RyaW5nO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgb3JkZXJfZGV0YWlsczogT3JkZXJEZXRhaWxzW11cclxufVxyXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxzIHtcclxuICBxdWFudGl0eTogbnVtYmVyO1xyXG4gIHVuaXRfcHJpY2U6IHN0cmluZztcclxuICBJR1NUOiBzdHJpbmc7XHJcbiAgQ0dTVDogc3RyaW5nO1xyXG4gIHBhY2thZ2luZ19jb3N0OiBzdHJpbmc7XHJcbiAgdW9tOiBzdHJpbmc7XHJcbiAgYXBwbWFzdGVyOiBudW1iZXI7XHJcbiAgcHJvZHVjdDogbnVtYmVyXHJcbn1cclxuIl19