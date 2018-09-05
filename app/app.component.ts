import { Component } from "@angular/core";
var orientation = require('nativescript-orientation');
import * as application from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
const firebase = require("nativescript-plugin-firebase");
let deviceToken = "";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    constructor(private router: RouterExtensions) {
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
        firebase.init({
            onPushTokenReceivedCallback: function (token) {
                console.log("--onPushTokenReceivedCallback token :" + token);
                deviceToken = token;
                if (deviceToken != '') {
                    setString('device_token', token)
                }
                console.log("Firebase push token: " + token);
            },
            onMessageReceivedCallback: function (message) {
                console.log("Push message: " + JSON.stringify(message))
                console.log("--onMessageReceivedCallback deviceToken :" + deviceToken)
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
        firebase.getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            if (token != null) {
                setString('device_token', token)
            }
            console.log(`Current push token: ${token}`);
        });

    }


}
