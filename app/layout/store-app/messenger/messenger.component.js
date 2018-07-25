"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
require("nativescript-websockets");
var StoreAppMessengerComponent = /** @class */ (function () {
    function StoreAppMessengerComponent(route, location, storeAppService, router, zone) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
        this.zone = zone;
        this.messages = [];
        this.message = "";
        // this.socket = new WebSocket("wss://echo.websocket.org:443", []);
        // this.socket.onopen = (evt) => this.onOpen(evt)
        // this.socket.onclose = (evt) => this.onClose(evt)
        // this.socket.onmessage = (evt) => this.onMessage(evt)
        // this.socket.onerror = (evt) => this.onError(evt)
    }
    StoreAppMessengerComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        // this.getAppDetails(this.app_id);
        this.createChatSession();
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
        // this.socket.close();
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
            // this.socket.send(this.message);
            this.sendMessageToApp();
            this.message = "";
        }
    };
    StoreAppMessengerComponent.prototype.createChatSession = function () {
        var _this = this;
        var data = {
            sender: this.user_id,
            sender_type: "customer",
            receiver: this.app_id,
            receiver_type: "app_master"
        };
        this.storeAppService.createChatSessionView(data).subscribe(function (res) {
            console.log(res);
            _this.uri = res['uri'];
            _this.getMessageList();
        }, function (error) {
            console.log(error);
        });
    };
    // connectToApp(uri) {
    //     var data = {
    //         user_id: this.app_id,
    //         user_type: "app_master"
    //     }
    //     this.storeAppService.connectToApp(data, uri).subscribe(
    //         res => {
    //             console.log(res)
    //             this.getMessageList();
    //         },
    //         error => {
    //             console.log(error)
    //         }
    //     )
    // }
    StoreAppMessengerComponent.prototype.getMessageList = function () {
        var _this = this;
        this.storeAppService.getMessageListByApp(this.uri).subscribe(function (res) {
            console.log(res);
            res['messages'].forEach(function (x) {
                var type = x['user_type'];
                var data = {
                    text: '',
                    created: new Date(),
                    sender: false
                };
                data.text = x['message'];
                if (type.toLowerCase() == "customer") {
                    data.sender = true;
                }
                _this.messages.push(data);
            });
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppMessengerComponent.prototype.sendMessageToApp = function () {
        var _this = this;
        var data = {
            user_id: this.user_id,
            user_type: "customer",
            message: this.message
        };
        this.storeAppService.messageToApp(data, this.uri).subscribe(function (res) {
            console.log(res);
            var data = {
                text: '',
                created: new Date(),
                sender: true
            };
            data.text = res['message'];
            _this.messages.push(data);
        }, function (error) {
            console.log(error);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2VuZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkU7QUFDN0UsMENBQWlEO0FBQ2pELDBDQUEyQztBQUMzQyw4RUFBMkU7QUFFM0Usc0RBQStEO0FBQy9ELDZEQUEyRjtBQUMzRixPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQU9uQztJQVNJLG9DQUNZLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQXdCLEVBQ3hCLElBQVk7UUFKWixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLG1FQUFtRTtRQUNuRSxpREFBaUQ7UUFDakQsbURBQW1EO1FBQ25ELHVEQUF1RDtRQUN2RCxtREFBbUQ7SUFDdkQsQ0FBQztJQUNELDZDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwyQ0FBTSxHQUFOLFVBQU8sR0FBRztRQUFWLGlCQVVDO1FBVEcsT0FB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QUNYLGlCQUFRO1lBQ0QsbUNBQWU7WUFDeEIseUJBQWdCO1lBQ2xCLGFBQU07T0FkZiwwQkFBMEIsQ0EwTHRDO0lBQUQsaUNBQUM7Q0FBQSxBQTFMRCxJQTBMQztBQTFMWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIFROU1Bob25lIGZyb20gJ25hdGl2ZXNjcmlwdC1waG9uZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5yZXF1aXJlKFwibmF0aXZlc2NyaXB0LXdlYnNvY2tldHNcIik7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdtZXNzZW5nZXInLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgbWVzc2VuZ2VyLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BtZXNzZW5nZXIuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcE1lc3NlbmdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgYXBwX293bmVyX2RldGFpbHM6IGFueTtcclxuICAgIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgc29ja2V0OiBhbnk7XHJcbiAgICBtZXNzYWdlczogQXJyYXk8YW55PjtcclxuICAgIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIHVyaTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgLy8gdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3NzOi8vZWNoby53ZWJzb2NrZXQub3JnOjQ0M1wiLCBbXSk7XHJcbiAgICAgICAgLy8gdGhpcy5zb2NrZXQub25vcGVuID0gKGV2dCkgPT4gdGhpcy5vbk9wZW4oZXZ0KVxyXG4gICAgICAgIC8vIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSAoZXZ0KSA9PiB0aGlzLm9uQ2xvc2UoZXZ0KVxyXG4gICAgICAgIC8vIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IChldnQpID0+IHRoaXMub25NZXNzYWdlKGV2dClcclxuICAgICAgICAvLyB0aGlzLnNvY2tldC5vbmVycm9yID0gKGV2dCkgPT4gdGhpcy5vbkVycm9yKGV2dClcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgICAgIHRoaXMudXNlcl9pZCA9IGdldFN0cmluZygndXNlcl9pZCcpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcF9pZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDaGF0U2Vzc2lvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3BlbihldnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhldnQpXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJXZWxjb21lIHRvIHRoZSBjaGF0IVwiLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIHNlbmRlcjogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKGV2dCkge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiWW91IGhhdmUgYmVlbiBkaXNjb25uZWN0ZWRcIixcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NZXNzYWdlKGV2dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2dClcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBldnQuZGF0YSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBzZW5kZXI6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRXJyb3IoZXZ0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgc29ja2V0IGhhZCBhbiBlcnJvclwiLCBldnQuZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldFN0b3JlQXBwRGV0YWlscyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfb3duZXJfZGV0YWlscyA9IHJlc1sndXNlciddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpc1ZpZXdlZChtZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc29ja2V0LnNlbmQodGhpcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjcmVhdGVDaGF0U2Vzc2lvbigpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgc2VuZGVyOiB0aGlzLnVzZXJfaWQsXHJcbiAgICAgICAgICAgIHNlbmRlcl90eXBlOiBcImN1c3RvbWVyXCIsXHJcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0aGlzLmFwcF9pZCxcclxuICAgICAgICAgICAgcmVjZWl2ZXJfdHlwZTogXCJhcHBfbWFzdGVyXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuY3JlYXRlQ2hhdFNlc3Npb25WaWV3KGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIHRoaXMudXJpID0gcmVzWyd1cmknXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWVzc2FnZUxpc3QoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29ubmVjdFRvQXBwKHVyaSkge1xyXG4gICAgLy8gICAgIHZhciBkYXRhID0ge1xyXG4gICAgLy8gICAgICAgICB1c2VyX2lkOiB0aGlzLmFwcF9pZCxcclxuICAgIC8vICAgICAgICAgdXNlcl90eXBlOiBcImFwcF9tYXN0ZXJcIlxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5jb25uZWN0VG9BcHAoZGF0YSwgdXJpKS5zdWJzY3JpYmUoXHJcbiAgICAvLyAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmdldE1lc3NhZ2VMaXN0KCk7XHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIGVycm9yID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgKVxyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICBnZXRNZXNzYWdlTGlzdCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRNZXNzYWdlTGlzdEJ5QXBwKHRoaXMudXJpKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICByZXNbJ21lc3NhZ2VzJ10uZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHhbJ3VzZXJfdHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGVyOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHQgPSB4WydtZXNzYWdlJ11cclxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlLnRvTG93ZXJDYXNlKCkgPT0gXCJjdXN0b21lclwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5zZW5kZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNZXNzYWdlVG9BcHAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHVzZXJfaWQ6IHRoaXMudXNlcl9pZCxcclxuICAgICAgICAgICAgdXNlcl90eXBlOiBcImN1c3RvbWVyXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5tZXNzYWdlVG9BcHAoZGF0YSwgdGhpcy51cmkpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRleHQgPSByZXNbJ21lc3NhZ2UnXTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goZGF0YSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iXX0=