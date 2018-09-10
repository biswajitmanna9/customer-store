import { Component, ViewChild, ElementRef } from "@angular/core";
var orientation = require('nativescript-orientation');
import * as application from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
const firebase = require("nativescript-plugin-firebase");
let deviceToken = "";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { NotificationService } from "./core/services/notification.service";
import { Button } from "ui/button";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    @ViewChild("button") button: ElementRef;
    constructor(
        private router: RouterExtensions,
        private notificationService: NotificationService
    ) {
        orientation.setOrientation("portrait");
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            if (this.router.canGoBack()) {
                args.cancel = true;
                this.router.back();
            } else {
                args.cancel = false;
            }
        });


        // push notification
        var $this = this;
        firebase.init({
            onPushTokenReceivedCallback: function (token) {
                deviceToken = token;
                console.log("Firebase push token: " + token);
            },
            onMessageReceivedCallback: function (message) {
                let el: Button = $this.button.nativeElement;
                el.notify({ eventName: "tap", object: el })
            },
            persist: false
        }).then(
            instance => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );

    }

    pushN() {
        this.notificationService.badgeCountStatus(true);
    }


}
