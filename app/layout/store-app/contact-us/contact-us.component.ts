import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'contact-us',
    moduleId: module.id,
    templateUrl: `contact-us.component.html`,
    styleUrls: [`contact-us.component.css`]
})
export class StoreAppContactUsComponent implements OnInit {
    app_id: string;
    constructor(
        private route: ActivatedRoute
    ) {

    }
    ngOnInit() {
        this.app_id = this.route.snapshot.params["id"];
        // console.log(this.route.snapshot.params["id"])
    }
}