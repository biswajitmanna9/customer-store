import { Component, OnInit } from '@angular/core';
import { ExploreService } from "../../core/services/explore.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import * as Globals from '../../core/globals';
@Component({
    selector: "dashboard",
    moduleId: module.id,
    templateUrl: "./all-app.component.html",
    styleUrls: ['./all-app.component.css']
})
export class AllAppComponent implements OnInit {
    user_app_list: any = [];
    base_url: string = Globals.img_base_url;
    app_list: any = [];
    visible_key: boolean
    constructor(
        private exploreService: ExploreService
    ) {

    }

    ngOnInit() {
        this.getRatedAppList();
    }


    getRatedAppList() {
        this.exploreService.getRatedAppList().subscribe(
            res => {
                this.app_list = res;
                this.visible_key = true;
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }    
}