import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import * as Globals from '../../core/globals';
import { ExploreService } from "../../core/services/explore.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LoginModalComponent } from '../../core/component/login-modal/login-modal.component';
import { SignUpModalComponent } from '../../core/component/signup-modal/signup-modal.component';
import { LocationModalComponent } from '../../core/component/location-modal/location-modal.component';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

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
    constructor(
        private exploreService: ExploreService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef
    ) {

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
                console.log(res);
                this.getRatedAppList();
            },
            error => {
                console.log(error)
            }
        )
    }


    getRatedAppList() {
        let params = '';
        params = '?page=' + this.page;
        this.exploreService.getRatedAppList(params).subscribe(
            (res) => {
                console.log(res)
                this.next_page = res.next;
                if (this.page == 1) {
                    this.app_list = [];
                }
                if (this.user_app_list.length > 0) {
                    res.results.forEach(x => {
                        var index = this.user_app_list.findIndex(y => y.id == x.id)
                        console.log(index)
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
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    openLoginModal(app_id) {
        this.modal.showModal(LoginModalComponent, this.options).then(res => {
            console.log(res);
            if (res != undefined) {
                if (res.signup) {
                    this.openSignupModal(app_id);
                }
                else if (res.success == 1) {
                    console.log(res)
                    this.user_id = res.user_id;
                    this.appAttachAndDisattach(app_id, this.user_id)
                }
            }
            else {
                var index = this.app_list.findIndex(x => x.id == app_id);
                this.app_list[index].isDashboard = false
            }
        })
    }

    openSignupModal(app_id) {
        this.modal.showModal(SignUpModalComponent, this.options).then(res => {
            console.log(res);
            if (res != undefined) {
                if (res.signin) {
                    this.openLoginModal(app_id);
                }
                else if (res.success == 1) {
                    this.user_id = res.id;
                    this.appAttachAndDisattach(app_id, this.user_id)
                }
            }
            else {
                var index = this.app_list.findIndex(x => x.id == app_id);
                this.app_list[index].isDashboard = false
            }
        })
    }

    addToDashboard(app_id) {
        if (!getBoolean('isLoggedin')) {
            this.openLoginModal(app_id);
        }
        else {
            this.appAttachAndDisattach(app_id, this.user_id)
        }

    }

    appAttachAndDisattach(app, user) {
        var index = this.app_list.findIndex(x => x.id == app)
        if (index != -1) {
            this.app_list[index].isDashboard = !this.app_list[index].isDashboard;
            var data = {
                "customer": user,
                "app_master": app
            }
            this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(
                res => {
                    console.log(res)
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

    onScroll(e) {
        console.log(e)
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