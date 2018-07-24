import { Component, OnInit, OnDestroy, NgZone, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
import { RouterExtensions } from "nativescript-angular/router";
require("nativescript-websockets");
@Component({
    selector: 'messenger',
    moduleId: module.id,
    templateUrl: `messenger.component.html`,
    styleUrls: [`messenger.component.css`]
})
export class StoreAppMessengerComponent implements OnInit, OnDestroy {
    app_id: string;
    app_owner_details: any;
    visible_key: boolean;
    message: string;
    socket: any;
    messages: Array<any>;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService,
        private router: RouterExtensions,
        private zone: NgZone
    ) {
        this.socket = new WebSocket("wss://echo.websocket.org:443", []);
        this.messages = [];
        this.message = "";
        this.socket.onopen = (evt) => this.onOpen(evt)
        this.socket.onclose = (evt) => this.onClose(evt)
        this.socket.onmessage = (evt) => this.onMessage(evt)
        this.socket.onerror = (evt) => this.onError(evt)
    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    }

    onOpen(evt) {
        console.log(evt)
        this.zone.run(() => {
            var data = {
                text: "Welcome to the chat!",
                created: new Date(),
                sender: true
            }
            this.messages.push(data);
        });
    }

    onClose(evt) {
        this.zone.run(() => {
            var data = {
                text: "You have been disconnected",
                created: new Date(),
                sender: true
            }
            this.messages.push(data);
        });
    }

    onMessage(evt) {
        console.log(evt)
        this.zone.run(() => {
            var data = {
                text: evt.data,
                created: new Date(),
                sender: false
            }
            this.messages.push(data);
        });
    }

    onError(evt) {
        console.log("The socket had an error", evt.error);
    }

    ngOnDestroy() {
        this.socket.close();
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


    isViewed(message) {
        return false
    }

    send() {
        if (this.message) {
            this.socket.send(this.message);
            this.message = "";
        }
    }
}