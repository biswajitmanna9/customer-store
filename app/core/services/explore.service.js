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
    ExploreService.prototype.getRatedAppList = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwbG9yZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUs4QjtBQUc5Qiw0Q0FBOEM7QUFHOUM7SUFFRSx3QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFekMsd0NBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELDJDQUFrQixHQUFsQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsTUFBTTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUVELGdEQUF1QixHQUF2QixVQUF3QixFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLG9CQUFvQixHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRUQseURBQWdDLEdBQWhDLFVBQWlDLElBQUk7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDaEYsQ0FBQztJQTFCVSxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBR2UsaUJBQVU7T0FGekIsY0FBYyxDQTRCMUI7SUFBRCxxQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwUGFyYW1zLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXhwbG9yZVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxyXG5cclxuICBnZXRDYXRlZ29yeUxpc3QoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnYWxsX2NhdGVnb3JpZXMvJylcclxuICB9XHJcblxyXG4gIGdldE1vc3RWaWV3QXBwTGlzdCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdtb3N0X3ZpZXdlZF9hcHAvJylcclxuICB9XHJcblxyXG4gIGdldFJhdGVkQXBwTGlzdCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoR2xvYmFscy5hcGlFbmRwb2ludCArICdtb3N0X3ZpZXdlZF9hcHAvJylcclxuICB9XHJcblxyXG4gIGdldEFsbEFwcExpc3QocGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnc2VhcmNoX2FwcC8nICsgcGFyYW1zKVxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckRhc2hib2FyZEFwcExpc3QoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnY3VzdG9tZXJfZGFzaGJvcmQvJyArIGlkICsgJy8nKVxyXG4gIH1cclxuXHJcbiAgYXBwQXR0YWNoQW5kRGlzYXR0YWNoVG9EYXNoYm9hcmQoZGF0YSl7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoR2xvYmFscy5hcGlFbmRwb2ludCArICdtYXBwaW5nX2FwcF9hbmRfY3VzdG9tZXIvJywgZGF0YSlcclxuICB9XHJcblxyXG59XHJcbiJdfQ==