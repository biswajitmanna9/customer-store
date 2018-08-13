import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
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
    constructor(
        private exploreService: ExploreService
    ) {

    }

    ngOnInit() {
        this.user_id = getString('user_id');
        this.getDashboardAppList();
    }

    getDashboardAppList() {
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(
            res => {
                this.user_app_list = res['app_master']
                console.log(res);
            },
            error => {
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