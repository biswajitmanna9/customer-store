import { Component, OnInit, OnDestroy, NgZone, Inject, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StoreAppService } from "../../../core/services/store-app.service";
import * as TNSPhone from 'nativescript-phone';
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
require("nativescript-websockets");
import { LoadingIndicator } from "nativescript-loading-indicator";
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
    user_id: string;


    @ViewChild("ScrollList") scrollList: ElementRef;

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

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storeAppService: StoreAppService,
        private router: RouterExtensions,
        private zone: NgZone
    ) {

        this.messages = [];
        this.message = "";

    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = getString('user_id');
        this.createChatSession();
        this.socket = new WebSocket("ws://132.148.147.239:8001/messages/?sender=" + this.user_id + "&sender_type=customer&receiver=" + this.app_id + "&receiver_type=app_master");
        this.socket.onopen = (evt) => this.onOpen(evt)
        this.socket.onclose = (evt) => this.onClose(evt)
        this.socket.onmessage = (evt) => this.onMessage(evt)
        this.socket.onerror = (evt) => this.onError(evt)
    }

    onOpen(evt) {
        console.log(evt)
        // this.zone.run(() => {
        //     var data = {
        //         text: "Welcome to the chat!",
        //         created: new Date(),
        //         sender: false
        //     }
        //     this.messages.push(data);
        // });
        console.log("Welcome to the chat!");
    }

    onClose(evt) {
        // this.zone.run(() => {
        //     var data = {
        //         text: "You have been disconnected",
        //         created: new Date(),
        //         sender: false
        //     }
        //     this.messages.push(data);
        // });
        console.log("You have been disconnected");
    }

    onMessage(evt) {
        console.log(JSON.parse(evt.data))
        var msgData = JSON.parse(evt.data)
        this.zone.run(() => {
            var data = {
                text: msgData.message,
                created: new Date()
            }
            if (msgData.chat_user == this.user_id) {
                data['sender'] = true
            }
            else {
                data['sender'] = false
            }
            this.messages.push(data);
            this.scrollToBottom();
        });
    }

    onError(evt) {
        console.log("The socket had an error");
    }

    ngOnDestroy() {
        // this.socket.close();
    }


    isViewed(message) {
        return false
    }

    send() {
        if (this.message) {
            var data = {
                chat_user: this.user_id,
                chat_user_type: "customer",
                message: this.message
            }
            this.socket.send(JSON.stringify(data));
            this.message = "";
        }
    }


    createChatSession() {
        var data = {
            chat_user: '',
            message: '',
            chat_user_type: ''
        }
        var param = "?sender=" + this.user_id + "&sender_type=customer&receiver=" + this.app_id + "&receiver_type=app_master"

        this.storeAppService.createChatSessionView(param, data).subscribe(
            res => {
                console.log(res)
                var thread = res['thread']
                this.getMessageList(thread);
            },
            error => {
                console.log(error)
            }
        )
    }


    getMessageList(thread) {
        this.loader.show(this.lodaing_options);
        this.storeAppService.getMessageListByApp(thread).subscribe(
            (res: any[]) => {
                console.log(res)
                res.forEach(x => {
                    var data = {
                        text: x.message,
                        created: x.datetime
                    }
                    if (x.chat_user == this.user_id) {
                        data['sender'] = true
                    }
                    else {
                        data['sender'] = false
                    }
                    this.messages.push(data)
                    console.log(this.messages)
                    this.scrollToBottom();
                   
                })
                this.loader.hide();
            },
            error => {
                this.loader.hide();
                console.log(error)
            }
        )
    }

    scrollToBottom() {
        setTimeout(() => {
            this.scrollList.nativeElement.scrollToVerticalOffset(100000);
        }, 1000);
    }
}