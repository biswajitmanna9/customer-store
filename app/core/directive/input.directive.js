"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MinLengthDirective = /** @class */ (function () {
    function MinLengthDirective() {
    }
    MinLengthDirective_1 = MinLengthDirective;
    MinLengthDirective.prototype.validate = function (control) {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MinLengthDirective.prototype, "minlength", void 0);
    MinLengthDirective = MinLengthDirective_1 = __decorate([
        core_1.Directive({
            selector: '[minlength]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MinLengthDirective_1, multi: true }]
        }),
        __metadata("design:paramtypes", [])
    ], MinLengthDirective);
    return MinLengthDirective;
    var MinLengthDirective_1;
}());
exports.MinLengthDirective = MinLengthDirective;
var MaxLengthDirective = /** @class */ (function () {
    function MaxLengthDirective() {
    }
    MaxLengthDirective_1 = MaxLengthDirective;
    MaxLengthDirective.prototype.validate = function (control) {
        return !control.value || control.value.length <= this.maxnlength ? null : { "maxlength": true };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MaxLengthDirective.prototype, "maxnlength", void 0);
    MaxLengthDirective = MaxLengthDirective_1 = __decorate([
        core_1.Directive({
            selector: '[maxlength]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MaxLengthDirective_1, multi: true }]
        }),
        __metadata("design:paramtypes", [])
    ], MaxLengthDirective);
    return MaxLengthDirective;
    var MaxLengthDirective_1;
}());
exports.MaxLengthDirective = MaxLengthDirective;
var IsEmailDirective = /** @class */ (function () {
    function IsEmailDirective() {
    }
    IsEmailDirective_1 = IsEmailDirective;
    IsEmailDirective.prototype.validate = function (control) {
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        var valid = emailRegEx.test(control.value);
        return control.value < 1 || valid ? null : { 'email': true };
    };
    IsEmailDirective = IsEmailDirective_1 = __decorate([
        core_1.Directive({
            selector: '[email]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IsEmailDirective_1, multi: true }]
        }),
        __metadata("design:paramtypes", [])
    ], IsEmailDirective);
    return IsEmailDirective;
    var IsEmailDirective_1;
}());
exports.IsEmailDirective = IsEmailDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELHdDQUEyRTtBQU0zRTtJQUlJO0lBQXNCLENBQUM7MkJBSmQsa0JBQWtCO0lBTXBCLHFDQUFRLEdBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25HLENBQUM7SUFOUTtRQUFSLFlBQUssRUFBRTs7eURBQW1CO0lBRmxCLGtCQUFrQjtRQUo5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO1NBQ3RGLENBQUM7O09BQ1csa0JBQWtCLENBVTlCO0lBQUQseUJBQUM7O0NBQUEsQUFWRCxJQVVDO0FBVlksZ0RBQWtCO0FBZ0IvQjtJQUlJO0lBQXNCLENBQUM7MkJBSmQsa0JBQWtCO0lBTXBCLHFDQUFRLEdBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BHLENBQUM7SUFOUTtRQUFSLFlBQUssRUFBRTs7MERBQW9CO0lBRm5CLGtCQUFrQjtRQUo5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO1NBQ3RGLENBQUM7O09BQ1csa0JBQWtCLENBVTlCO0lBQUQseUJBQUM7O0NBQUEsQUFWRCxJQVVDO0FBVlksZ0RBQWtCO0FBZ0IvQjtJQUVJO0lBQXNCLENBQUM7eUJBRmQsZ0JBQWdCO0lBSWxCLG1DQUFRLEdBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsSUFBSSxVQUFVLEdBQUcseUpBQXlKLENBQUM7UUFDM0ssSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUMvRCxDQUFDO0lBUlEsZ0JBQWdCO1FBSjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxxQkFBYSxFQUFFLFdBQVcsRUFBRSxrQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7U0FDcEYsQ0FBQzs7T0FDVyxnQkFBZ0IsQ0FVNUI7SUFBRCx1QkFBQzs7Q0FBQSxBQVZELElBVUM7QUFWWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttaW5sZW5ndGhdJyxcclxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTWluTGVuZ3RoRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNaW5MZW5ndGhEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIG1pbmxlbmd0aDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcclxuICAgICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5sZW5ndGggPyBudWxsIDogeyBcIm1pbmxlbmd0aFwiOiB0cnVlIH07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21heGxlbmd0aF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBNYXhMZW5ndGhEaXJlY3RpdmUsIG11bHRpOiB0cnVlfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1heExlbmd0aERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgQElucHV0KCkgbWF4bmxlbmd0aDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcclxuICAgICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gdGhpcy5tYXhubGVuZ3RoID8gbnVsbCA6IHsgXCJtYXhsZW5ndGhcIjogdHJ1ZSB9O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tlbWFpbF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBJc0VtYWlsRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc0VtYWlsRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICAgICAgbGV0IGVtYWlsUmVnRXggPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL2k7XHJcbiAgICAgICAgbGV0IHZhbGlkID0gZW1haWxSZWdFeC50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBjb250cm9sLnZhbHVlIDwgMSB8fCB2YWxpZCA/IG51bGwgOiB7J2VtYWlsJzogdHJ1ZX07XHJcbiAgICB9XHJcblxyXG59Il19