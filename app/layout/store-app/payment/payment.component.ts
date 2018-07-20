import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
@Component({
    selector: 'payment',
    moduleId: module.id,
    templateUrl: `payment.component.html`,
    styleUrls: [`payment.component.css`]
})
export class StoreAppPaymentComponent implements OnInit {
    app_id: string;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
    ) {

    }
    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
    }
}