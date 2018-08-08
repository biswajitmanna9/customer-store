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
    }
    StoreAppMessengerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.createChatSession();
        this.socket = new WebSocket("ws://132.148.147.239:8001/messages/?sender=" + this.user_id + "&sender_type=customer&receiver=" + this.app_id + "&receiver_type=app_master");
        this.socket.onopen = function (evt) { return _this.onOpen(evt); };
        this.socket.onclose = function (evt) { return _this.onClose(evt); };
        this.socket.onmessage = function (evt) { return _this.onMessage(evt); };
        this.socket.onerror = function (evt) { return _this.onError(evt); };
    };
    StoreAppMessengerComponent.prototype.onOpen = function (evt) {
        console.log(evt);
        // this.zone.run(() => {
        //     var data = {
        //         text: "Welcome to the chat!",
        //         created: new Date(),
        //         sender: false
        //     }
        //     this.messages.push(data);
        // });
        console.log("Welcome to the chat!");
    };
    StoreAppMessengerComponent.prototype.onClose = function (evt) {
        // this.zone.run(() => {
        //     var data = {
        //         text: "You have been disconnected",
        //         created: new Date(),
        //         sender: false
        //     }
        //     this.messages.push(data);
        // });
        console.log("You have been disconnected");
    };
    StoreAppMessengerComponent.prototype.onMessage = function (evt) {
        var _this = this;
        console.log(JSON.parse(evt.data));
        var msgData = JSON.parse(evt.data);
        this.zone.run(function () {
            var data = {
                text: msgData.message,
                created: new Date()
            };
            if (msgData.chat_user == _this.user_id) {
                data['sender'] = true;
            }
            else {
                data['sender'] = false;
            }
            _this.messages.push(data);
            _this.scrollToBottom();
        });
    };
    StoreAppMessengerComponent.prototype.onError = function (evt) {
        console.log("The socket had an error");
    };
    StoreAppMessengerComponent.prototype.ngOnDestroy = function () {
        // this.socket.close();
    };
    StoreAppMessengerComponent.prototype.isViewed = function (message) {
        return false;
    };
    StoreAppMessengerComponent.prototype.send = function () {
        if (this.message) {
            var data = {
                chat_user: this.user_id,
                chat_user_type: "customer",
                message: this.message
            };
            this.socket.send(JSON.stringify(data));
            this.message = "";
        }
    };
    StoreAppMessengerComponent.prototype.createChatSession = function () {
        var _this = this;
        var data = {
            chat_user: '',
            message: '',
            chat_user_type: ''
        };
        var param = "?sender=" + this.user_id + "&sender_type=customer&receiver=" + this.app_id + "&receiver_type=app_master";
        this.storeAppService.createChatSessionView(param, data).subscribe(function (res) {
            console.log(res);
            var thread = res['thread'];
            _this.getMessageList(thread);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppMessengerComponent.prototype.getMessageList = function (thread) {
        var _this = this;
        this.storeAppService.getMessageListByApp(thread).subscribe(function (res) {
            console.log(res);
            res.forEach(function (x) {
                var data = {
                    text: x.message,
                    created: x.datetime
                };
                if (x.chat_user == _this.user_id) {
                    data['sender'] = true;
                }
                else {
                    data['sender'] = false;
                }
                _this.messages.push(data);
                console.log(_this.messages);
                _this.scrollToBottom();
            });
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppMessengerComponent.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.scrollList.nativeElement.scrollToVerticalOffset(100000);
        }, 1000);
    };
    __decorate([
        core_1.ViewChild("ScrollList"),
        __metadata("design:type", core_1.ElementRef)
    ], StoreAppMessengerComponent.prototype, "scrollList", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2VuZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0c7QUFDcEcsMENBQWlEO0FBQ2pELDBDQUEyQztBQUMzQyw4RUFBMkU7QUFFM0Usc0RBQStEO0FBQy9ELDZEQUEyRjtBQUMzRixPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQU9uQztJQVNJLG9DQUNZLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQXdCLEVBQ3hCLElBQVk7UUFKWixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFDRCw2Q0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyw2Q0FBNkMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMkJBQTJCLENBQUMsQ0FBQztR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MEIsQ0EwSnRDO0lBQUQsaUNBQUM7Q0FBQSxBQTFKRCxJQTBKQztBQTFKWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUsIEluamVjdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgVE5TUGhvbmUgZnJvbSAnbmF0aXZlc2NyaXB0LXBob25lJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbnJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtd2Vic29ja2V0c1wiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21lc3NlbmdlcicsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IGBtZXNzZW5nZXIuY29tcG9uZW50Lmh0bWxgLFxyXG4gICAgc3R5bGVVcmxzOiBbYG1lc3Nlbmdlci5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwTWVzc2VuZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgICBhcHBfb3duZXJfZGV0YWlsczogYW55O1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzb2NrZXQ6IGFueTtcclxuICAgIG1lc3NhZ2VzOiBBcnJheTxhbnk+O1xyXG4gICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgQFZpZXdDaGlsZChcIlNjcm9sbExpc3RcIikgc2Nyb2xsTGlzdDogRWxlbWVudFJlZjtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcclxuICAgICkge1xyXG5cclxuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNoYXRTZXNzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly8xMzIuMTQ4LjE0Ny4yMzk6ODAwMS9tZXNzYWdlcy8/c2VuZGVyPVwiICsgdGhpcy51c2VyX2lkICsgXCImc2VuZGVyX3R5cGU9Y3VzdG9tZXImcmVjZWl2ZXI9XCIgKyB0aGlzLmFwcF9pZCArIFwiJnJlY2VpdmVyX3R5cGU9YXBwX21hc3RlclwiKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSAoZXZ0KSA9PiB0aGlzLm9uT3BlbihldnQpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9IChldnQpID0+IHRoaXMub25DbG9zZShldnQpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gKGV2dCkgPT4gdGhpcy5vbk1lc3NhZ2UoZXZ0KVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoZXZ0KSA9PiB0aGlzLm9uRXJyb3IoZXZ0KVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3BlbihldnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhldnQpXHJcbiAgICAgICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGV4dDogXCJXZWxjb21lIHRvIHRoZSBjaGF0IVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAvLyAgICAgICAgIHNlbmRlcjogZmFsc2VcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXZWxjb21lIHRvIHRoZSBjaGF0IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKGV2dCkge1xyXG4gICAgICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAvLyAgICAgICAgIHRleHQ6IFwiWW91IGhhdmUgYmVlbiBkaXNjb25uZWN0ZWRcIixcclxuICAgICAgICAvLyAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgLy8gICAgICAgICBzZW5kZXI6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGhhdmUgYmVlbiBkaXNjb25uZWN0ZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25NZXNzYWdlKGV2dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoZXZ0LmRhdGEpKVxyXG4gICAgICAgIHZhciBtc2dEYXRhID0gSlNPTi5wYXJzZShldnQuZGF0YSlcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dEYXRhLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1zZ0RhdGEuY2hhdF91c2VyID09IHRoaXMudXNlcl9pZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVsnc2VuZGVyJ10gPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydzZW5kZXInXSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FcnJvcihldnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBzb2NrZXQgaGFkIGFuIGVycm9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlzVmlld2VkKG1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjaGF0X3VzZXI6IHRoaXMudXNlcl9pZCxcclxuICAgICAgICAgICAgICAgIGNoYXRfdXNlcl90eXBlOiBcImN1c3RvbWVyXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNyZWF0ZUNoYXRTZXNzaW9uKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBjaGF0X3VzZXI6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgICAgICAgY2hhdF91c2VyX3R5cGU6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXJhbSA9IFwiP3NlbmRlcj1cIiArIHRoaXMudXNlcl9pZCArIFwiJnNlbmRlcl90eXBlPWN1c3RvbWVyJnJlY2VpdmVyPVwiICsgdGhpcy5hcHBfaWQgKyBcIiZyZWNlaXZlcl90eXBlPWFwcF9tYXN0ZXJcIlxyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmNyZWF0ZUNoYXRTZXNzaW9uVmlldyhwYXJhbSwgZGF0YSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgdmFyIHRocmVhZCA9IHJlc1sndGhyZWFkJ11cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWVzc2FnZUxpc3QodGhyZWFkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldE1lc3NhZ2VMaXN0KHRocmVhZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldE1lc3NhZ2VMaXN0QnlBcHAodGhyZWFkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogeC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiB4LmRhdGV0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4LmNoYXRfdXNlciA9PSB0aGlzLnVzZXJfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnc2VuZGVyJ10gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhWydzZW5kZXInXSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWVzc2FnZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsVG9Cb3R0b20oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMTAwMDAwKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxufSJdfQ==