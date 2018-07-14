import { Component, OnInit } from '@angular/core';
import { ItemEventData } from "ui/list-view";
import { Switch } from "ui/switch";

import { registerElement } from 'nativescript-angular/element-registry';
import { FilterSelect } from 'nativescript-filter-select';
registerElement('FilterSelect', () => FilterSelect);

import { ExploreService } from "../../core/services/explore.service";
import { Observable } from 'tns-core-modules/data/observable';
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListView } from "tns-core-modules/ui/list-view";
import {
  EventData,
} from "tns-core-modules/data/observable";
import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { SearchBar } from "ui/search-bar";
import { ViewChild, ElementRef, NgZone } from '@angular/core';
let API_KEY = "AIzaSyB3FKbaqonmY-bDPanbzJSH9U7HXF8dpS4";
let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);
@Component({
  selector: "explore",
  moduleId: module.id,
  templateUrl: "./explore.component.html",
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent extends Observable {
  category_list: any = [];
  app_list: any = [];
  selected_category: string = '';
  location: string = '';
  googlePlacesAutocomplete: GooglePlacesAutocomplete;
  page: Page;
  events;
  searchInput = new Subject<string>();
  items;
  @ViewChild('placesList') public places_list: ElementRef;
  public searchPhrase: string;
  constructor(
    private exploreService: ExploreService
  ) {
    super();
    this.searchInput.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((params: any) => {
      // let list = <ListView>this.places_list.nativeElement;
      googlePlacesAutocomplete.search(params)
        .then((places: any) => {
          this.items = [];
          this.items = places;
          this.set('items', this.items);
          console.log(this.items)
          // list.items = this.items;
          // list.refresh();
        }, (error => {
          console.log(error)
        }));
    }
      ,
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getCategoryList();
    this.getMostViewAppList();

  }

  getPlace(place) {
    googlePlacesAutocomplete.getPlaceById(place.placeId).then((place) => {
      dialogs.alert("Frmatted address :" + place.formattedAddress + "\n latitude: " + place.latitude + "\n longitude: " + place.longitude)
        .then(function () { });
    }, error => {
      console.log(error)
    })
  }

  public searchFieldChanged(args: EventData) {
    var tmptextfield = <TextField>args.object
    this.searchInput
      .next(tmptextfield.text)
  }

  listViewItemTap(args) {
    this.getPlace(this.items[args.index]);
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

  addToDashboard(args, id) {
    let val = <Switch>args.object;
    if (val.checked) {

    } else {

    }
  }



  onCategoryChange(args) {
    this.selected_category = '';
    var SelectedCat: any = [];
    args.selected.forEach(element => {
      SelectedCat.push(element.id)
    });
    this.selected_category = SelectedCat.toString();
  }

  searchAppList() {
    let params = '';
    if (this.location != '' && this.selected_category != '') {
      params = '?search=' + this.location + '&category=' + this.selected_category;
    }
    else if (this.location == '' && this.selected_category != '') {
      params = '?category=' + this.selected_category;
    }
    else if (this.location != '' && this.selected_category == '') {
      params = '?search=' + this.location;
    }
    this.exploreService.getAllAppList(params).subscribe(
      res => {
        this.app_list = res;
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  search() {
    this.searchAppList();
  }


}