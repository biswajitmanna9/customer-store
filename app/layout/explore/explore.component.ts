import * as geoLocation from "nativescript-geolocation";
import { Component, OnInit } from '@angular/core';
import { ItemEventData } from "ui/list-view";
import { Switch } from "ui/switch";

import { registerElement } from 'nativescript-angular/element-registry';
import { FilterSelect } from 'nativescript-filter-select';
registerElement('FilterSelect', () => FilterSelect);

import { ExploreService } from "../../core/services/explore.service";

// import { MapsAPILoader } from '@agm/core';
// import { } from '@types/googlemaps';
// import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: "explore",
  moduleId: module.id,
  templateUrl: "./explore.component.html",
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  // @ViewChild('search') public searchElement: ElementRef;
  category_list: any = [];
  app_list: any = [];
  currentGeoLocation: any;
  constructor(
    private exploreService: ExploreService,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone
  ) {

  }

  ngOnInit() {
    this.getCategoryList();
    this.getMostViewAppList();
    // this.mapsAPILoader.load().then(
    //   () => {
    //     let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

    //     autocomplete.addListener("place_changed", () => {
    //       this.ngZone.run(() => {
    //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //         if (place.geometry === undefined || place.geometry === null) {
    //           return;
    //         }
    //       });
    //     });
    //   }
    // );
  }

  enableLocationServices(): void {
    geoLocation.isEnabled().then(enabled => {
      if (!enabled) {
        geoLocation.enableLocationRequest().then(() => this.showLocation());
      } else {
        this.showLocation();
      }
    });
  }

  showLocation(): void {
    geoLocation.watchLocation(location => {
      this.currentGeoLocation = location;
    }, error => {
      alert(error);
    }, {
        desiredAccuracy: 3,
        updateDistance: 10,
        minimumUpdateTime: 1000 * 1
      });
  }

  getCategoryList() {
    this.exploreService.getCategoryList().subscribe(
      res => {
        this.category_list = res;
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  getMostViewAppList() {
    this.exploreService.getMostViewAppList().subscribe(
      res => {
        this.app_list = res;
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
  }

  addToDashboard(args) {
    let val = <Switch>args.object;
    if (val.checked) {

    } else {

    }
  }



  onCategoryChange(args) {
    console.log(args.selected)
  }


}