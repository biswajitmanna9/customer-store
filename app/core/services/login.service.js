"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Globals = require("../../core/globals");
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.login = function (data) {
        var options = this.createRequestHeader();
        return this.http.post(Globals.apiEndpoint + 'customer_login/', { data: data }, { headers: options });
    };
    LoginService.prototype.createRequestHeader = function () {
        var headers = new http_1.HttpHeaders();
        // let token = this.globals.getToken();
        // if (token != "") {
        //     headers.set("X-AUTH-TOKEN", token);
        // }
        headers.set("Accept", "application/json");
        //headers.set("AuthToken", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBSzhCO0FBRzlCLDRDQUE4QztBQUc5QztJQUVFLHNCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBSyxHQUFMLFVBQU0sSUFBSTtRQUNSLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFDTywwQ0FBbUIsR0FBM0I7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyx1Q0FBdUM7UUFDdkMscUJBQXFCO1FBQ3JCLDBDQUEwQztRQUMxQyxJQUFJO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyx1Q0FBdUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFsQlksWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQUdlLGlCQUFVO09BRnpCLFlBQVksQ0FtQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztBQW5CWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEhlYWRlcnMsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cFBhcmFtcyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vY29yZS9nbG9iYWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGxvZ2luKGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChHbG9iYWxzLmFwaUVuZHBvaW50ICsgJ2N1c3RvbWVyX2xvZ2luLycsIHsgZGF0YSB9LCB7IGhlYWRlcnM6IG9wdGlvbnMgfSlcclxuICB9XHJcbiAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIC8vIGxldCB0b2tlbiA9IHRoaXMuZ2xvYmFscy5nZXRUb2tlbigpO1xyXG4gICAgLy8gaWYgKHRva2VuICE9IFwiXCIpIHtcclxuICAgIC8vICAgICBoZWFkZXJzLnNldChcIlgtQVVUSC1UT0tFTlwiLCB0b2tlbik7XHJcbiAgICAvLyB9XHJcbiAgICBoZWFkZXJzLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAvL2hlYWRlcnMuc2V0KFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICBoZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxufVxyXG59XHJcbiJdfQ==