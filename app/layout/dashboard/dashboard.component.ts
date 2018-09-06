import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
import { LoadingIndicator } from "nativescript-loading-indicator";
import { NotificationService } from "../../core/services/notification.service";

@Component({
    selector: "dashboard",
    moduleId: module.id,
    templateUrl: "./dashboard.component.html",
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user_id: string;
    user_app_list: any = [];
    base_url: string = Globals.img_base_url;
    loader = new LoadingIndicator();
    lodaing_options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            cancelListener: function (dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6",
            backgroundColor: "yellow",
            userInteractionEnabled: false,
            hideBezel: true,
        }
    }
    device_token: string;
    constructor(
        private exploreService: ExploreService,
        private notificationService: NotificationService
    ) {

    }

    ngOnInit() {
        this.user_id = getString('user_id');
        this.device_token = getString('device_token');
        console.log(this.device_token);
        this.getDashboardAppList();
        this.updateDeviceToken();
    }


    updateDeviceToken() {
        var data = {
            customer_device_token: this.device_token
        }
        this.notificationService.updateDeviceToken(this.user_id, data).subscribe(
            res => {
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    getDashboardAppList() {
        this.loader.show(this.lodaing_options);
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(
            res => {
                this.user_app_list = res['app_master']
                console.log(res);
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }


    removeFromDashboard(app_id) {
        var data = {
            "customer": this.user_id,
            "app_master": app_id
        }
        this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(
            res => {
                this.getDashboardAppList();
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }
}