"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
        this.countries = [
            { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
            { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
            { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
            { name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png" },
            { name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png" },
            { name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png" },
            { name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png" },
            { name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png" },
            { name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png" },
            { name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png" },
            { name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png" },
            { name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png" },
            { name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png" },
            { name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png" },
            { name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png" },
            { name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png" },
            { name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png" },
        ];
    }
    DashboardComponent.prototype.onItemTap = function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "dashboard",
            moduleId: module.id,
            templateUrl: "./dashboard.component.html",
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFRMUM7SUF3QkU7UUF2QkEsY0FBUyxHQUF5QztZQUNoRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzdGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDM0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUM1RixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzFGLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDL0YsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDbEcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMzRixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDNUYsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMzRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzNGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMzRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzNGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDMUYsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtTQUNwRyxDQUFDO0lBT0EsQ0FBQztJQUxILHNDQUFTLEdBQVQsVUFBVSxJQUFtQjtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXZCWSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7O09BQ1csa0JBQWtCLENBMkI5QjtJQUFELHlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidWkvbGlzdC12aWV3XCJcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJkYXNoYm9hcmRcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IHtcclxuICBjb3VudHJpZXM6IHsgbmFtZTogc3RyaW5nLCBpbWFnZVNyYzogc3RyaW5nIH1bXSA9IFtcclxuICAgIHsgbmFtZTogXCJBdXN0cmFsaWFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2F1LnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiQmVsZ2l1bVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvYmUucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJCdWxnYXJpYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvYmcucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJDYW5hZGFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2NhLnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiU3dpdHplcmxhbmRcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2NoLnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiQ2hpbmFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2NuLnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiQ3plY2ggUmVwdWJsaWNcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2N6LnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiR2VybWFueVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvZGUucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJTcGFpblwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvZXMucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJFdGhpb3BpYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvZXQucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJDcm9hdGlhXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9oci5wbmdcIiB9LFxyXG4gICAgeyBuYW1lOiBcIkh1bmdhcnlcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2h1LnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiSXRhbHlcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2l0LnBuZ1wiIH0sXHJcbiAgICB7IG5hbWU6IFwiSmFtYWljYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3Mvam0ucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJSb21hbmlhXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9yby5wbmdcIiB9LFxyXG4gICAgeyBuYW1lOiBcIlJ1c3NpYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvcnUucG5nXCIgfSxcclxuICAgIHsgbmFtZTogXCJVbml0ZWQgU3RhdGVzXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy91cy5wbmdcIiB9LFxyXG5dO1xyXG5cclxub25JdGVtVGFwKGFyZ3M6IEl0ZW1FdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdJdGVtIHdpdGggaW5kZXg6ICcgKyBhcmdzLmluZGV4ICsgJyB0YXBwZWQnKTtcclxufVxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICB9XHJcbn0iXX0=