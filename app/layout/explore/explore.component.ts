import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { FilterSelect } from 'nativescript-filter-select';
registerElement('FilterSelect', () => FilterSelect);
import { ExploreService } from "../../core/services/explore.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LocationModalComponent } from '../../core/component/location-modal/location-modal.component';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RouterExtensions } from "nativescript-angular/router";

import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

@Component({
  selector: "explore",
  moduleId: module.id,
  templateUrl: "./explore.component.html",
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  category_list: any = [];
  app_list: any = [];
  selected_category: string = '';
  location: string = '';
  options = {
    context: {},
    fullscreen: false,
    viewContainerRef: this.vcRef
  };
  private feedback: Feedback;
  user_id: string;
  user_app_list: any = [];
  latitude: any;
  longitude: any;
  visible_key: boolean;
  loader = new LoadingIndicator();
  lodaing_options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
      indeterminate: true,
      cancelable: true,
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
  @ViewChild('myfilter') myfilter: ElementRef;
  rating: any = [1, 2, 3, 4, 5];
  page: number = 0;
  next_page: string;
  constructor(
    private exploreService: ExploreService,
    private modal: ModalDialogService,
    private router: RouterExtensions,
    private vcRef: ViewContainerRef
  ) {
    this.feedback = new Feedback();
  }

  ngOnInit() {
    this.loader.show(this.lodaing_options);
    this.user_id = getString('user_id');
    this.getCategoryList();
    if (this.user_id != undefined) {
      this.getDashboardAppList();
    }
    else {
      this.getMostViewAppList();
    }

  }

  getDashboardAppList() {
    this.exploreService.getUserDashboardAppList(this.user_id).subscribe(
      res => {
        this.user_app_list = res['app_master']
        // console.log(res);
        this.getMostViewAppList();
      },
      error => {
        // console.log(error)
      }
    )
  }




  getCategoryList() {
    this.exploreService.getCategoryList().subscribe(
      (res: any[]) => {
        this.category_list = res;
        // console.log(res)
      },
      error => {
        // console.log(error)

      }
    )
  }

  getMostViewAppList() {
    this.exploreService.getMostViewAppList().subscribe(
      res => {
        this.app_list = [];
        if (this.user_app_list.length > 0) {
          res.forEach(x => {
            var index = this.user_app_list.findIndex(y => y.id == x.id)
            if (index != -1) {
              x['isDashboard'] = true;
            }
            else {
              x['isDashboard'] = false;
            }
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
          this.loader.hide();
        }
        else {
          res.forEach(x => {
            x['isDashboard'] = false;
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
          this.loader.hide();
        }
        this.visible_key=true;

        // console.log(res)
      },
      error => {
        this.loader.hide();
        // console.log(error)
      }
    )
  }


  addToDashboard(app_id) {
    if (!getBoolean('isLoggedin')) {
      this.feedback.error({
        title: "You have to login first",
        backgroundColor: new Color("red"),
        titleColor: new Color("black"),
        position: FeedbackPosition.Bottom,
        type: FeedbackType.Custom
      });
      this.router.navigate(["/login"], { clearHistory: true });
    }
    else {
      this.appAttachAndDisattach(app_id, this.user_id)
    }

  }

  appAttachAndDisattach(app, user) {
    this.loader.show(this.lodaing_options);
    var index = this.app_list.findIndex(x => x.id == app)
    if (index != -1) {
      var data = {
        "customer": user,
        "app_master": app
      }
      this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(
        res => {
          this.loader.hide()
          this.app_list[index].isDashboard = !this.app_list[index].isDashboard;

          if (this.app_list[index].isDashboard) {
            var msg = "App has been successfully added in your dashboard"
          }
          else {
            var msg = "App has been successfully removed from your dashboard"
          }
          this.feedback.success({
            title: msg,
            backgroundColor: new Color("green"),
            titleColor: new Color("black"),
            position: FeedbackPosition.Bottom,
            type: FeedbackType.Custom
          });
          // console.log(res)
        },
        error => {
          this.loader.hide()
          this.feedback.error({
            title: error.error.msg,
            backgroundColor: new Color("red"),
            titleColor: new Color("black"),
            position: FeedbackPosition.Bottom,
            type: FeedbackType.Custom
          });
          // console.log(error)
        }
      )
    }
  }

  searchLocation() {
    var option = {
      context: {},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(LocationModalComponent, option).then(res => {
      // console.log(res);
      if (res.current == true) {
        this.location = "Current Location";
        this.latitude = res.place.latitude;
        this.longitude = res.place.longitude;
        this.search();
      }
      else if (res.current == false) {
        this.location = res.place.name;
        this.latitude = res.place.latitude;
        this.longitude = res.place.longitude;
        this.search();
      }
    })
  }

  onCategoryChange(args) {
    this.selected_category = '';
    var SelectedCat: any = [];
    args.selected.forEach(element => {
      SelectedCat.push(element.id)
    });
    this.selected_category = SelectedCat.toString();
    this.search();
  }

  searchAppList() {
    let params = '';
    if (this.location != '' && this.selected_category != '') {
      params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&category=' + this.selected_category + '&page=' + this.page;
    }
    else if (this.location == '' && this.selected_category != '') {
      params = '?category=' + this.selected_category + '&page=' + this.page;
    }
    else if (this.location != '' && this.selected_category == '') {
      params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&page=' + this.page;
    }
    else {
      params = '?page=' + this.page;
    }
    this.exploreService.getAllAppList(params).subscribe(
      res => {
        this.next_page = res.next;
        if (this.page == 1) {
          this.app_list = [];
        }
        if (this.user_app_list.length > 0) {
          res.results.forEach(x => {
            var index = this.user_app_list.findIndex(y => y.id == x.id)
            if (index != -1) {
              x['isDashboard'] = true;
            }
            else {
              x['isDashboard'] = false;
            }
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
          this.loader.hide()
        }
        else {
          res.results.forEach(x => {
            x['isDashboard'] = false;
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
          this.loader.hide()
        }
        // console.log(res)
      },
      error => {
        this.loader.hide()
        // console.log(error)
      }
    )
  }

  search() {
    this.loader.show(this.lodaing_options);
    this.page = 1;
    this.searchAppList();
  }

  onScroll(e) {
    if (this.next_page != null) {
      var num_arr = this.next_page.split('=');
      var count = +num_arr[num_arr.length - 1]
      if (this.page == count - 1) {
        this.page = count;
        this.searchAppList();
      }
    }
  }

}