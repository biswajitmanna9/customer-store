import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: 'app-menu-bar',
    moduleId: module.id,
    templateUrl: `app-menu-bar.component.html`,
    styleUrls: [`app-menu-bar.component.css`]
})
export class AppMenuBarComponent implements OnInit {
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