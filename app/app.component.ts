import { Component } from "@angular/core";
var orientation = require('nativescript-orientation');
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    constructor() {
        orientation.setOrientation("portrait");
    }
}
