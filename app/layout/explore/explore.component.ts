import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { FilterSelect } from 'nativescript-filter-select';
registerElement('FilterSelect', () => FilterSelect);
import { ExploreService } from "../../core/services/explore.service";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LoginModalComponent } from '../../core/component/login-modal/login-modal.component';
import { SignUpModalComponent } from '../../core/component/signup-modal/signup-modal.component';
import { LocationModalComponent } from '../../core/component/location-modal/location-modal.component';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";


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
  user_id: string;
  user_app_list: any = [];
  latitude: any;
  longitude: any;
  @ViewChild('myfilter') myfilter: ElementRef;
  rating: any = [1, 2, 3, 4, 5]
  constructor(
    private exploreService: ExploreService,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.user_id = getString('user_id');
    console.log(getString('user_id'))
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
        console.log(res);
        this.getMostViewAppList();
      },
      error => {
        console.log(error)
      }
    )
  }




  getCategoryList() {
    this.exploreService.getCategoryList().subscribe(
      (res: any[]) => {
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
        this.app_list = [];
        if (this.user_app_list.length > 0) {
          res.forEach(x => {
            var index = this.user_app_list.findIndex(y => y.id == x.id)
            console.log(index)
            if (index != -1) {
              x['isDashboard'] = true;
            }
            else {
              x['isDashboard'] = false;
            }
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
        }
        else {
          res.forEach(x => {
            x['isDashboard'] = false;
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
        }
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }


  openLoginModal(app_id) {
    this.modal.showModal(LoginModalComponent, this.options).then(res => {
      console.log(res);
      if (res != undefined) {
        if (res.signup) {
          this.openSignupModal(app_id);
        }
        else if (res.success == 1) {
          this.user_id = res.user_id;
          this.appAttachAndDisattach(app_id, this.user_id)
        }
      }
      else {
        var index = this.app_list.findIndex(x => x.id == app_id);
        this.app_list[index].isDashboard = false
      }
    })
  }

  openSignupModal(app_id) {
    this.modal.showModal(SignUpModalComponent, this.options).then(res => {
      console.log(res);
      if (res != undefined) {
        if (res.signin) {
          this.openLoginModal(app_id);
        }
        else if (res.success == 1) {
          this.user_id = res.id;
          this.appAttachAndDisattach(app_id, this.user_id)
        }
      }
      else {
        var index = this.app_list.findIndex(x => x.id == app_id);
        this.app_list[index].isDashboard = false
      }
    })
  }

  addToDashboard(app_id) {
    if (!getBoolean('isLoggedin')) {
      this.openLoginModal(app_id);
    }
    else {
      this.appAttachAndDisattach(app_id, this.user_id)
    }

  }

  appAttachAndDisattach(app, user) {
    var index = this.app_list.findIndex(x => x.id == app)
    if (index != -1) {
      this.app_list[index].isDashboard = !this.app_list[index].isDashboard;
      var data = {
        "customer": user,
        "app_master": app
      }
      this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
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
      console.log(res);

      if (res.current == true) {
        this.location = "Current Location";
        this.latitude = res.place.latitude;
        this.longitude = res.place.longitude;
        this.searchAppList();
      }
      else if (res.current == false) {
        this.location = res.place.name;
        this.latitude = res.place.latitude;
        this.longitude = res.place.longitude;
        this.searchAppList();
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
    this.searchAppList();
  }

  searchAppList() {
    let params = '';
    if (this.location != '' && this.selected_category != '') {
      params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&category=' + this.selected_category;
    }
    else if (this.location == '' && this.selected_category != '') {
      params = '?category=' + this.selected_category;
    }
    else if (this.location != '' && this.selected_category == '') {
      params = '?latitude=' + this.latitude + '&longitude=' + this.longitude;
    }
    this.exploreService.getAllAppList(params).subscribe(
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
        }
        else {
          res.forEach(x => {
            x['isDashboard'] = false;
            x['avg_rating'] = Math.round(x['avg_rating'])
            this.app_list.push(x);
          })
        }
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

  // http://192.168.24.208:8000/search_app/?latitude=22.5402602&longitude=88.3821989
}