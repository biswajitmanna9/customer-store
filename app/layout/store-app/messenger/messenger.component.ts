import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
@Component({
    selector: 'messenger',
    moduleId: module.id,
    templateUrl: `messenger.component.html`,
    styleUrls: [`messenger.component.css`]
})
export class StoreAppMessengerComponent implements OnInit {
    app_id: string;
    app_owner_details: any;
    visible_key: boolean;
    items: any = []
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService
    ) {
        this.items = [
            {
                id: 1,
                name: 'A k',
                message: "test 1"
            },
            {
                id: 2,
                name: 'B M',
                message: "test 2"
            },
            {
                id: 3,
                name: 'S Roy',
                message: "test 3"
            }
        ]
    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    }


    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_owner_details = res['user'];
                this.visible_key = true;
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }
}