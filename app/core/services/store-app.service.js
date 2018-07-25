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
    StoreAppService.prototype.createChatSessionView = function (data) {
        return this.http.post(Globals.apiEndpoint + 'chats/', data);
    };
    // connectToApp(data, uri) {
    //   return this.http.patch(Globals.apiEndpoint + 'chats/' + uri + '/', data)
    // }
    StoreAppService.prototype.getMessageListByApp = function (uri) {
        return this.http.get(Globals.apiEndpoint + 'chats/' + uri + '/messages/');
    };
    StoreAppService.prototype.messageToApp = function (data, uri) {
        return this.http.post(Globals.apiEndpoint + 'chats/' + uri + '/messages/', data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FLOEI7QUFHOUIsNENBQThDO0FBRzlDO0lBRUUseUJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDO0lBRXpDLDRDQUFrQixHQUFsQixVQUFtQixFQUFFO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBR0QsK0NBQXFCLEdBQXJCLFVBQXNCLElBQUk7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBNEI7SUFDNUIsNkVBQTZFO0lBQzdFLElBQUk7SUFFSiw2Q0FBbUIsR0FBbkIsVUFBb0IsR0FBRztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsSUFBSSxFQUFFLEdBQUc7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQTNCVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR2UsaUJBQVU7T0FGekIsZUFBZSxDQTZCM0I7SUFBRCxzQkFBQztDQUFBLEFBN0JELElBNkJDO0FBN0JZLDBDQUFlO0FBZ0M1QjtJQUFBO0lBSUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQUFBO0lBU0EsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEhlYWRlcnMsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cFBhcmFtcyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vY29yZS9nbG9iYWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGdldFN0b3JlQXBwRGV0YWlscyhpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdhcHBfYWxsX2RldGFpbHMvJyArIGlkICsgJy8nKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlT3JkZXIoZGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY3JlYXRlX29yZGVycy8nLCBkYXRhKVxyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZUNoYXRTZXNzaW9uVmlldyhkYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoR2xvYmFscy5hcGlFbmRwb2ludCArICdjaGF0cy8nLCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgLy8gY29ubmVjdFRvQXBwKGRhdGEsIHVyaSkge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2NoYXRzLycgKyB1cmkgKyAnLycsIGRhdGEpXHJcbiAgLy8gfVxyXG5cclxuICBnZXRNZXNzYWdlTGlzdEJ5QXBwKHVyaSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdjaGF0cy8nICsgdXJpICsgJy9tZXNzYWdlcy8nKVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZVRvQXBwKGRhdGEsIHVyaSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY2hhdHMvJyArIHVyaSArICcvbWVzc2FnZXMvJywgZGF0YSlcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE9yZGVyTW9kdWxlIHtcclxuICBjdXN0b21lcjogc3RyaW5nO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgb3JkZXJfZGV0YWlsczogT3JkZXJEZXRhaWxzW11cclxufVxyXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxzIHtcclxuICBxdWFudGl0eTogbnVtYmVyO1xyXG4gIHVuaXRfcHJpY2U6IHN0cmluZztcclxuICBJR1NUOiBzdHJpbmc7XHJcbiAgQ0dTVDogc3RyaW5nO1xyXG4gIHBhY2thZ2luZ19jb3N0OiBzdHJpbmc7XHJcbiAgdW9tOiBzdHJpbmc7XHJcbiAgYXBwbWFzdGVyOiBudW1iZXI7XHJcbiAgcHJvZHVjdDogbnVtYmVyXHJcbn1cclxuIl19