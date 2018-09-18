import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import * as Globals from '../../core/globals';
import { ExploreService } from "../../core/services/explore.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "dashboard",
    moduleId: module.id,
    templateUrl: "./all-app.component.html",
    styleUrls: ['./all-app.component.css']
})
export class AllAppComponent implements OnInit {
    base_url: string = Globals.img_base_url;
    app_list: any = [];
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    user_id: string;
    user_app_list: any = [];
    visible_key: boolean;
    rating: any = [1, 2, 3, 4, 5];
    page: number = 1;
    next_page: string;
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
    private feedback: Feedback;
    constructor(
        private exploreService: ExploreService,
        private modal: ModalDialogService,
        private router: RouterExtensions,
        private vcRef: ViewContainerRef
    ) {
        this.feedback = new Feedback();
    }

    ngOnInit() {
        this.user_id = getString('user_id');
        this.getRatedAppList();
        if (this.user_id != undefined) {
            this.getDashboardAppList();
        }
        else {
            this.getRatedAppList();
        }
    }

    getDashboardAppList() {
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(
            res => {
                this.user_app_list = res['app_master']
                // console.log(res);
                this.getRatedAppList();
            },
            error => {
                // console.log(error)
            }
        )
    }


    getRatedAppList() {
        let params = '';
        params = '?page=' + this.page;
        this.loader.show(this.lodaing_options);
        this.exploreService.getRatedAppList(params).subscribe(
            (res) => {
                // console.log(res)
                this.next_page = res.next;
                if (this.page == 1) {
                    this.app_list = [];
                }
                if (this.user_app_list.length > 0) {
                    res.results.forEach(x => {
                        var index = this.user_app_list.findIndex(y => y.id == x.id)

                        if (index != -1) {
                            x['isDashboard'] = true;
                        }
                        else {
                            x['isDashboard'] = false;
                        }
                        x['avg_rating'] = Math.round(x['avg_rating'])
                        this.app_list.push(x);
                    })
                }
                else {
                    res.results.forEach(x => {
                        x['isDashboard'] = false;
                        x['avg_rating'] = Math.round(x['avg_rating'])
                        this.app_list.push(x);
                    })
                }
                this.loader.hide();
                // console.log(res)
            },
            error => {
                this.loader.hide();
                // console.log(error)
            }
        )
    }


    addToDashboard(app_id) {
        if (!getBoolean('isLoggedin')) {
            this.feedback.error({
                title: "You have to login first",
                backgroundColor: new Color("red"),
                titleColor: new Color("black"),
                position: FeedbackPosition.Bottom,
                type: FeedbackType.Custom
            });
            this.router.navigate(["/login"], { clearHistory: true });
        }
        else {
            this.appAttachAndDisattach(app_id, this.user_id)
        }

    }

    appAttachAndDisattach(app, user) {
        this.loader.show(this.lodaing_options);
        var index = this.app_list.findIndex(x => x.id == app)
        if (index != -1) {
            var data = {
                "customer": user,
                "app_master": app
            }
            this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(
                res => {
                    this.loader.hide()
                    this.app_list[index].isDashboard = !this.app_list[index].isDashboard;

                    if (this.app_list[index].isDashboard) {
                        var msg = "App has been successfully added in your dashboard"
                    }
                    else {
                        var msg = "App has been successfully removed from your dashboard"
                    }
                    this.feedback.success({
                        title: msg,
                        backgroundColor: new Color("green"),
                        titleColor: new Color("black"),
                        position: FeedbackPosition.Bottom,
                        type: FeedbackType.Custom
                    });
                    // console.log(res)
                },
                error => {
                    this.loader.hide()
                    this.feedback.error({
                        title: error.error.msg,
                        backgroundColor: new Color("red"),
                        titleColor: new Color("black"),
                        position: FeedbackPosition.Bottom,
                        type: FeedbackType.Custom
                    });
                    // console.log(error)
                }
            )
        }
    }

    onScroll(e) {
        if (this.next_page != null) {
            var num_arr = this.next_page.split('=');
            var count = +num_arr[num_arr.length - 1]
            if (this.page == count - 1) {
                this.page = count;
                this.getRatedAppList();
            }
        }
    }
}