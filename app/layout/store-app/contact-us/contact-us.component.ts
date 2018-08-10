import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
import { Router } from "@angular/router";
@Component({
    selector: 'contact-us',
    moduleId: module.id,
    templateUrl: `contact-us.component.html`,
    styleUrls: [`contact-us.component.css`]
})
export class StoreAppContactUsComponent implements OnInit {
    app_id: string;
    app_owner_details: any;
    visible_key: boolean
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService,
        private router: Router
    ) {

    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    }


    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_owner_details = res;
                this.visible_key = true;
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }

    massage() {
        this.router.navigate(['/store-app/', this.app_id , 'messenger'])
    }

    call(mobile) {
        TNSPhone.dial(mobile.toString(), true);
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