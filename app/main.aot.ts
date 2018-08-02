// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from "nativescript-angular/platform-static";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("ImageSwipe", () => require("nativescript-image-swipe/image-swipe").ImageSwipe);
// "./app.module.ngfactory" is a dynamically generated module when compiled with AoT.
import { AppModuleNgFactory } from "./app.module.ngfactory";

platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
