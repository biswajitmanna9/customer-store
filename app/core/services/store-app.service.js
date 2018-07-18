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
    StoreAppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], StoreAppService);
    return StoreAppService;
}());
exports.StoreAppService = StoreAppService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FLOEI7QUFHOUIsNENBQThDO0FBRzlDO0lBRUUseUJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDO0lBRXpDLDRDQUFrQixHQUFsQixVQUFtQixFQUFFO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBTlUsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUdlLGlCQUFVO09BRnpCLGVBQWUsQ0FTM0I7SUFBRCxzQkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwUGFyYW1zLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH0gIFxyXG5cclxuICBnZXRTdG9yZUFwcERldGFpbHMoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KEdsb2JhbHMuYXBpRW5kcG9pbnQgKyAnYXBwX2FsbF9kZXRhaWxzLycgKyBpZCArICcvJylcclxuICB9XHJcbiAgXHJcblxyXG59XHJcbiJdfQ==