import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
import { RouterExtensions } from "nativescript-angular/router";
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
    messages: any = [];
    message: string;   
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService,
        private router: RouterExtensions
    ) {
        this.messages = [
            {
                id: 1,
                text: "Hi",
                created: new Date(),
                sender: true
            },
            {
                id: 2,
                text: "Hello",
                created: new Date(),
                sender: false
            },
            {
                id: 11,
                text: "what's app?",
                created: new Date(),
                sender: false
            },
            {
                id: 3,
                text: "how are you",
                created: new Date(),
                sender: true
            },
            {
                id: 4,
                text: "Fine",
                created: new Date(),
                sender: false
            },
            {
                id: 1,
                text: "Hi",
                created: new Date(),
                sender: true
            },
            {
                id: 2,
                text: "Hello",
                created: new Date(),
                sender: false
            },
            {
                id: 11,
                text: "what's app?",
                created: new Date(),
                sender: false
            },
            {
                id: 3,
                text: "how are you",
                created: new Date(),
                sender: true
            },
            {
                id: 4,
                text: "Fine",
                created: new Date(),
                sender: false
            },
            {
                id: 1,
                text: "Hi",
                created: new Date(),
                sender: true
            },
            {
                id: 2,
                text: "Hello",
                created: new Date(),
                sender: false
            },
            {
                id: 11,
                text: "what's app?",
                created: new Date(),
                sender: false
            },
            {
                id: 3,
                text: "how are you",
                created: new Date(),
                sender: true
            },
            {
                id: 4,
                text: "Fine",
                created: new Date(),
                sender: false
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

    goBack() {
        this.router.back();
    }

    chat(){
        
    }

    isViewed(message) {
        // return message.sent === SentStatus.VIEWED;
        return true
    }
}