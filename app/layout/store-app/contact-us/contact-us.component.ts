import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
import { Router } from "@angular/router";
import { LoadingIndicator } from "nativescript-loading-indicator";
var OpenUrl = require("nativescript-openurl");
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { NotificationService } from "../../../core/services/notification.service";

@Component({
    selector: 'contact-us',
    moduleId: module.id,
    templateUrl: `contact-us.component.html`,
    styleUrls: [`contact-us.component.css`]
})
export class StoreAppContactUsComponent implements OnInit {
    app_id: string;
    app_details: any;
    visible_key: boolean;
    loader = new LoadingIndicator();
    social_media_links: any = [];

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
    chat_length: number = 0;
    badgeCountStatus: boolean;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService,
        private router: Router,
        private notificationService: NotificationService
    ) {
        notificationService.getBadgeCountStatus.subscribe(status => this.changebadgeCountStatus(status))
    }

    private changebadgeCountStatus(status: boolean): void {
        this.badgeCountStatus = status;
        console.log(this.badgeCountStatus)
        if (this.badgeCountStatus == true) {
            this.ngOnInit();
        }
    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);

        this.getSocialMediaListByApp(this.app_id);
        this.getChatMembersDetails();
    }

    getChatMembersDetails() {
        var param = "?user=" + getString('user_id') + "&user_type=customer"
        this.storeAppService.getChatMembersDetails(param).subscribe(
            (res: any[]) => {
                console.log(res)
                var sum = 0;
                res.forEach(x => {
                    sum += x.how_many_messages
                })
                this.chat_length = sum;
            },
            error => {
                console.log(error)
                this.loader.hide();
            }
        )
    }


    getAppDetails(id) {
        this.loader.show(this.lodaing_options);
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                this.visible_key = true;
                console.log(res)
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }
    getSocialMediaListByApp(id) {
        this.storeAppService.getSocialMediaListByApp(id).subscribe(
            res => {
                this.social_media_links = res;
                console.log(this.social_media_links);
            },
            error => {
                console.log(error)
            }
        )
    }

    massage() {
        this.router.navigate(['/store-app/', this.app_id, 'messenger'])
    }

    call(mobile) {
        TNSPhone.dial(mobile.toString(), true);
    }


    launch(url) {
        OpenUrl(url);
    }

    // Text a number (or multiple numbers)
    // public messageParents() {
    //     TNSPhone.sms(['212-555-1234', '212-555-0987'], "Text till your fingers bleed")
    //         .then(
    //             (args) => {
    //                 console.log(JSON.stringify(args));
    //             }, (err) => {
    //                 console.log('Error: ' + err);
    //             }
    //         )
    // }
}