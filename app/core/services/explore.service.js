"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Globals = require("../../core/globals");
var ExploreService = /** @class */ (function () {
    function ExploreService(http) {
        this.http = http;
    }
    ExploreService.prototype.getCategoryList = function () {
        return this.http.get(Globals.apiEndpoint + 'all_categories/');
    };
    ExploreService.prototype.getMostViewAppList = function () {
        return this.http.get(Globals.apiEndpoint + 'most_viewed_app/');
    };
    ExploreService.prototype.getAllAppList = function (params) {
        return this.http.get(Globals.apiEndpoint + 'search_app/' + params);
    };
    ExploreService.prototype.getUserDashboardAppList = function (id) {
        return this.http.get(Globals.apiEndpoint + 'customer_dashbord/' + id + '/');
    };
    ExploreService.prototype.appAttachAndDisattachToDashboard = function (data) {
        return this.http.post(Globals.apiEndpoint + 'mapping_app_and_customer/', data);
    };
    ExploreService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ExploreService);
    return ExploreService;
}());
exports.ExploreService = ExploreService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwbG9yZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUs4QjtBQUc5Qiw0Q0FBOEM7QUFHOUM7SUFFRSx3QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFekMsd0NBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELDJDQUFrQixHQUFsQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBRUQsZ0RBQXVCLEdBQXZCLFVBQXdCLEVBQUU7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzdFLENBQUM7SUFFRCx5REFBZ0MsR0FBaEMsVUFBaUMsSUFBSTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBdEJVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHZSxpQkFBVTtPQUZ6QixjQUFjLENBd0IxQjtJQUFELHFCQUFDO0NBQUEsQUF4QkQsSUF3QkM7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBIdHRwQ2xpZW50LFxyXG4gIEh0dHBIZWFkZXJzLFxyXG4gIEh0dHBFcnJvclJlc3BvbnNlLFxyXG4gIEh0dHBQYXJhbXMsXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxzIGZyb20gJy4uLy4uL2NvcmUvZ2xvYmFscyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHBsb3JlU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdhbGxfY2F0ZWdvcmllcy8nKVxyXG4gIH1cclxuXHJcbiAgZ2V0TW9zdFZpZXdBcHBMaXN0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ21vc3Rfdmlld2VkX2FwcC8nKVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQXBwTGlzdChwYXJhbXMpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdzZWFyY2hfYXBwLycgKyBwYXJhbXMpXHJcbiAgfVxyXG5cclxuICBnZXRVc2VyRGFzaGJvYXJkQXBwTGlzdChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdjdXN0b21lcl9kYXNoYm9yZC8nICsgaWQgKyAnLycpXHJcbiAgfVxyXG5cclxuICBhcHBBdHRhY2hBbmREaXNhdHRhY2hUb0Rhc2hib2FyZChkYXRhKXtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ21hcHBpbmdfYXBwX2FuZF9jdXN0b21lci8nLCBkYXRhKVxyXG4gIH1cclxuXHJcbn1cclxuIl19