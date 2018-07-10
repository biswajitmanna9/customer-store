"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Globals = require("../../core/globals");
var ExploreService = /** @class */ (function () {
    function ExploreService(http, zone) {
        this.http = http;
        this.zone = zone;
    }
    ExploreService.prototype.getCategoryList = function (params) {
        return this.http.get(Globals.apiEndpoint + 'all_employee/?' + params, {
            headers: new http_1.HttpHeaders().set('Authorization', 'Token ')
        });
    };
    ExploreService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, core_1.NgZone])
    ], ExploreService);
    return ExploreService;
}());
exports.ExploreService = ExploreService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwbG9yZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELDZDQUs4QjtBQUc5Qiw0Q0FBOEM7QUFHOUM7SUFFRSx3QkFBb0IsSUFBZ0IsRUFBVSxJQUFZO1FBQXRDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUksQ0FBQztJQUUvRCx3Q0FBZSxHQUFmLFVBQWdCLE1BQU07UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUMsZ0JBQWdCLEdBQUMsTUFBTSxFQUFFO1lBQ2hFLE9BQU8sRUFBRSxJQUFJLGtCQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQztTQUMxRCxDQUFDLENBQUE7SUFDSixDQUFDO0lBUlUsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUdlLGlCQUFVLEVBQWdCLGFBQU07T0FGL0MsY0FBYyxDQVUxQjtJQUFELHFCQUFDO0NBQUEsQUFWRCxJQVVDO0FBVlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEhlYWRlcnMsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cFBhcmFtcyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vY29yZS9nbG9iYWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4cGxvcmVTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHpvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gIGdldENhdGVnb3J5TGlzdChwYXJhbXMpOiBPYnNlcnZhYmxlPGFueT57XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChHbG9iYWxzLmFwaUVuZHBvaW50KydhbGxfZW1wbG95ZWUvPycrcGFyYW1zLCB7XHJcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQXV0aG9yaXphdGlvbicsICdUb2tlbiAnKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG59XHJcbiJdfQ==