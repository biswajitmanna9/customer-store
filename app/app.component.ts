import { Component, ViewChild, ElementRef } from "@angular/core";
var orientation = require('nativescript-orientation');
import * as application from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
const firebase = require("nativescript-plugin-firebase");

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

            },
            onMessageReceivedCallback: function (message) {
                let el: Button = $this.button.nativeElement;
                el.notify({ eventName: "tap", object: el })
            },
            persist: false
        }).then(
            instance => {

            },
            error => {

            }
        );

    }

    pushN() {
        this.notificationService.badgeCountStatus(true);
    }


}
