"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("nativescript-angular/router");
require("nativescript-websockets");
var StoreAppMessengerComponent = /** @class */ (function () {
    function StoreAppMessengerComponent(route, location, storeAppService, router, zone) {
        var _this = this;
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
        this.zone = zone;
        this.socket = new WebSocket("wss://echo.websocket.org:443", []);
        this.messages = [];
        this.message = "";
        this.socket.onopen = function (evt) { return _this.onOpen(evt); };
        this.socket.onclose = function (evt) { return _this.onClose(evt); };
        this.socket.onmessage = function (evt) { return _this.onMessage(evt); };
        this.socket.onerror = function (evt) { return _this.onError(evt); };
    }
    StoreAppMessengerComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    };
    StoreAppMessengerComponent.prototype.onOpen = function (evt) {
        var _this = this;
        console.log(evt);
        this.zone.run(function () {
            var data = {
                text: "Welcome to the chat!",
                created: new Date(),
                sender: true
            };
            _this.messages.push(data);
        });
    };
    StoreAppMessengerComponent.prototype.onClose = function (evt) {
        var _this = this;
        this.zone.run(function () {
            var data = {
                text: "You have been disconnected",
                created: new Date(),
                sender: true
            };
            _this.messages.push(data);
        });
    };
    StoreAppMessengerComponent.prototype.onMessage = function (evt) {
        var _this = this;
        console.log(evt);
        this.zone.run(function () {
            var data = {
                text: evt.data,
                created: new Date(),
                sender: false
            };
            _this.messages.push(data);
        });
    };
    StoreAppMessengerComponent.prototype.onError = function (evt) {
        console.log("The socket had an error", evt.error);
    };
    StoreAppMessengerComponent.prototype.ngOnDestroy = function () {
        this.socket.close();
    };
    StoreAppMessengerComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_owner_details = res['user'];
            _this.visible_key = true;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppMessengerComponent.prototype.isViewed = function (message) {
        return false;
    };
    StoreAppMessengerComponent.prototype.send = function () {
        if (this.message) {
            this.socket.send(this.message);
            this.message = "";
        }
    };
    StoreAppMessengerComponent = __decorate([
        core_1.Component({
            selector: 'messenger',
            moduleId: module.id,
            templateUrl: "messenger.component.html",
            styleUrls: ["messenger.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService,
            router_2.RouterExtensions,
            core_1.NgZone])
    ], StoreAppMessengerComponent);
    return StoreAppMessengerComponent;
}());
exports.StoreAppMessengerComponent = StoreAppMessengerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2VuZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkU7QUFDN0UsMENBQWlEO0FBQ2pELDBDQUEyQztBQUMzQyw4RUFBMkU7QUFFM0Usc0RBQStEO0FBQy9ELE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBT25DO0lBT0ksb0NBQ1ksS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBd0IsRUFDeEIsSUFBWTtRQUx4QixpQkFjQztRQWJXLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVE7UUFFcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUE7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFBO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQTtRQUNwRCxJQUFJLENBQUMs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QUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQTlGUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBU3FCLHVCQUFjO1lBQ1gsaUJBQVE7WUFDRCxtQ0FBZTtZQUN4Qix5QkFBZ0I7WUFDbEIsYUFBTTtPQVpmLDBCQUEwQixDQStGdEM7SUFBRCxpQ0FBQztDQUFBLEFBL0ZELElBK0ZDO0FBL0ZZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgSW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgVE5TUGhvbmUgZnJvbSAnbmF0aXZlc2NyaXB0LXBob25lJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxucmVxdWlyZShcIm5hdGl2ZXNjcmlwdC13ZWJzb2NrZXRzXCIpO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWVzc2VuZ2VyJyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogYG1lc3Nlbmdlci5jb21wb25lbnQuaHRtbGAsXHJcbiAgICBzdHlsZVVybHM6IFtgbWVzc2VuZ2VyLmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBNZXNzZW5nZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBhcHBfaWQ6IHN0cmluZztcclxuICAgIGFwcF9vd25lcl9kZXRhaWxzOiBhbnk7XHJcbiAgICB2aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHNvY2tldDogYW55O1xyXG4gICAgbWVzc2FnZXM6IEFycmF5PGFueT47XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3c3M6Ly9lY2hvLndlYnNvY2tldC5vcmc6NDQzXCIsIFtdKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSAoZXZ0KSA9PiB0aGlzLm9uT3BlbihldnQpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9IChldnQpID0+IHRoaXMub25DbG9zZShldnQpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gKGV2dCkgPT4gdGhpcy5vbk1lc3NhZ2UoZXZ0KVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoZXZ0KSA9PiB0aGlzLm9uRXJyb3IoZXZ0KVxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwX2lkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wZW4oZXZ0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXZ0KVxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiV2VsY29tZSB0byB0aGUgY2hhdCFcIixcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZShldnQpIHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIllvdSBoYXZlIGJlZW4gZGlzY29ubmVjdGVkXCIsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWVzc2FnZShldnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhldnQpXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogZXZ0LmRhdGEsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgc2VuZGVyOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVycm9yKGV2dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHNvY2tldCBoYWQgYW4gZXJyb3JcIiwgZXZ0LmVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFwcERldGFpbHMoaWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwX293bmVyX2RldGFpbHMgPSByZXNbJ3VzZXInXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgaXNWaWV3ZWQobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5zZW5kKHRoaXMubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19