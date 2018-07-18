import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'products',
    moduleId: module.id,
    templateUrl: `products.component.html`,
    styleUrls: [`products.component.css`]
})

export class StoreAppProductsComponent implements OnInit {
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