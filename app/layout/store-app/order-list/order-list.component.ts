import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
@Component({
    selector: '',
    moduleId: module.id,
    templateUrl: `order-list.component.html`,
    styleUrls: [`order-list.component.css`]
})
export class StoreAppOrderListComponent implements OnInit {
    app_id: string;
    user_id: string;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
    ) {

    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = getString('user_id');
        console.log(this.app_id)
    }
}